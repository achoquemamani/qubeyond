<template>
  <div>
    <p>{{ title }}</p>
    <div class="q-pa-md">
      <q-table
        v-model:pagination="pagination"
        :rows="planets"
        :columns="columns"
        row-key="name"
        :rows-per-page-options="[]"
        @request="onRequest"
      >
        <template v-slot:top-right>
          <q-btn
            color="primary"
            icon-right="archive"
            :label="`${t('pages.index.btnExportCsv')}`"
            no-caps
            @click="exportTable"
          />
        </template>
      </q-table>
      <q-inner-loading
        :showing="isLoading"
        :label="`${t('pages.index.loading')}`"
        label-style="font-size: 1.1em"
      />
    </div>
  </div>
</template>

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
      }
    ]);
    const pagination = ref({
      sortBy: 'desc',
      descending: false,
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 10
    });
    const { notifySuccess, notifyError } = useNotification($q);
    const { getContent } = useExportCsv();
    const { sortByField } = useSortItems();

    onMounted(async () => {
      await getPlanets(1);
    });

    const getPlanets = async (page: number) => {
      isLoading.value = true;
      try {
        const response: GetPlanetResponse = await axios.get(
          `${API_URL}/planets?page=${page}`
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
      t,
      onRequest,
      exportTable
    };
  }
});
</script>
