<template>
  <div class="col-sm-12">
    <q-table
      v-model:pagination="pagination"
      :rows="planets"
      :columns="columns"
      row-key="name"
      :rows-per-page-options="[]"
      @request="onRequest"
      :visible-columns="visibleColumns"
    >
      <template v-slot:top>
        <div class="col-sm-12 row q-mb-sm">
          <div class="col-2 q-table__title">{{ title }}</div>

          <div v-if="$q.screen.gt.xs" class="col">
            <template :key="key" v-for="(item, key) in columns">
              <q-toggle
                v-model="visibleColumns"
                :val="item.name"
                :label="item.label"
              />
            </template>
          </div>
        </div>
        <div class="col-sm-12 row">
          <div class="col-sm-6 row">
            <q-input
              class="q-mr-sm"
              stack-label
              filled
              v-model="textByFilter"
              :placeholder="`${t('pages.index.inputToSearch')}`"
              dense
            />
            <q-btn
              size="md"
              class="q-mr-sm"
              color="primary"
              icon-right="search"
              no-caps
              @click="filterPlanets"
            />
            <q-btn
              size="sm"
              class="q-mr-lg"
              color="primary"
              icon-right="fa fa-trash"
              no-caps
              @click="cleanSearchText"
            >
              <q-tooltip>{{ t('pages.index.btnCleanSearchText') }}</q-tooltip>
            </q-btn>
          </div>
          <div class="col-sm-6">
            <q-btn
              class="btn-export-csv"
              color="primary"
              icon-right="archive"
              :label="`${t('pages.index.btnExportCsv')}`"
              no-caps
              @click="exportTable"
            />
          </div>
        </div>
      </template>
    </q-table>
    <q-inner-loading
      :showing="isLoading"
      :label="`${t('pages.index.loading')}`"
      label-style="font-size: 1.1em"
    />
  </div>
</template>

<style scoped lang="scss">
.btn-export-csv {
  position: relative;
  float: right;
}
</style>

<script lang="ts">
import axios from 'axios';
import { exportFile, useQuasar } from 'quasar';
import { defineComponent, ref, onMounted } from 'vue';
import {
  Planet,
  ReadablePlanet,
  Column,
  GetPlanetResponse,
  Pagination
} from './models';
import { config } from '../config/index';
import { useI18n } from 'vue-i18n';
import useNotification from '../mixins/notification';
import useExportCsv from '../mixins/exportCsv';
import useSortItems from '../mixins/sortItems';

const API_URL = config.apiUrl;

export default defineComponent({
  name: 'PlanetTable',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup() {
    const $q = useQuasar();
    const { t } = useI18n();

    const planets = ref<ReadablePlanet[]>([]);
    const isLoading = ref<boolean>(false);
    const columns = ref<Column[]>([
      {
        name: 'name',
        label: `${t('pages.index.columns.name')}`,
        field: 'name',
        sortable: true
      },
      {
        name: 'rotation_period',
        label: `${t('pages.index.columns.rotationPeriod')}`,
        field: 'rotation_period',
        sortable: true
      },
      {
        name: 'orbital_period',
        label: `${t('pages.index.columns.orbitalPeriod')}`,
        field: 'orbital_period',
        sortable: true
      },
      {
        name: 'diameter',
        label: `${t('pages.index.columns.diameter')}`,
        field: 'diameter',
        sortable: true
      },
      {
        name: 'climate',
        label: `${t('pages.index.columns.climate')}`,
        field: 'climate'
      },
      {
        name: 'gravity',
        label: `${t('pages.index.columns.gravity')}`,
        field: 'gravity'
      },
      {
        name: 'terrain',
        label: `${t('pages.index.columns.terrain')}`,
        field: 'terrain'
      },
      {
        name: 'surface_water',
        label: `${t('pages.index.columns.surfaceWater')}`,
        field: 'surface_water',
        sortable: true
      },
      {
        name: 'population',
        label: `${t('pages.index.columns.population')}`,
        field: 'population',
        sortable: true
      }
    ]);
    const pagination = ref({
      sortBy: 'desc',
      descending: false,
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 10
    });
    const visibleColumns = ref([
      'name',
      'rotation_period',
      'orbital_period',
      'diameter',
      'climate',
      'gravity',
      'terrain',
      'surface_water',
      'population'
    ]);
    const textByFilter = ref<string>('');
    const { notifySuccess, notifyError } = useNotification($q);
    const { getContent } = useExportCsv();
    const { sortByField } = useSortItems();

    onMounted(async () => {
      await getPlanets(1);
    });

    const filterPlanets = async () => {
      await getPlanets(1);
    };

    const cleanSearchText = async () => {
      textByFilter.value = '';
      await getPlanets(1);
    };

    const getPlanets = async (page: number) => {
      isLoading.value = true;
      try {
        const response: GetPlanetResponse = await axios.get(
          `${API_URL}/planets?page=${page}&search=${textByFilter.value}`
        );
        pagination.value.rowsNumber = response.data.count;
        planets.value = response.data.results.map((item) => {
          return Planet.fromDto(item);
        });
        isLoading.value = false;
      } catch (err) {
        isLoading.value = false;
        notifyError('Error in searching planets.');
      }
    };

    const onRequest = async (props: Pagination) => {
      const { page, rowsPerPage, sortBy, descending } = props.pagination;

      await getPlanets(page);

      if (sortBy) {
        const sortFn = sortByField(descending, sortBy);
        planets.value.sort(sortFn);
      }

      pagination.value.page = page;
      pagination.value.rowsPerPage = rowsPerPage;
      pagination.value.sortBy = sortBy;
      pagination.value.descending = descending;
    };

    const exportTable = () => {
      const content = getContent(columns.value, planets.value);

      const status = exportFile('table-export.csv', content, 'text/csv');
      if (!status) {
        notifyError('Browser denied file download...');
      } else {
        notifySuccess('Descargado con éxito');
      }
    };

    return {
      planets,
      columns,
      isLoading,
      pagination,
      textByFilter,
      visibleColumns,
      t,
      onRequest,
      exportTable,
      filterPlanets,
      cleanSearchText
    };
  }
});
</script>
