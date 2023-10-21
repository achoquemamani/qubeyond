<template>
  <div>
    <!-- <p>{{ title }}</p> -->
    <div class="q-pa-md">
      <q-table :rows="planets" :columns="columns" row-key="name" />
      <q-inner-loading
        :showing="isLoading"
        label="Loading..."
        label-class="text-teal"
        label-style="font-size: 1.1em"
      />
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent, ref, onMounted } from 'vue';
import { Planet, Column, GetPlanetResponse } from './models';
import { config } from '../config/index';
const API_URL = config.apiUrl;

export default defineComponent({
  name: 'PlanetTable',
  setup() {
    const planets = ref<Planet[]>([]);
    const isLoading = ref<boolean>(false);
    const columns = ref<Column[]>([
      { name: 'name', label: 'Tatooine', field: 'name', sortable: true },
      {
        name: 'rotation_period',
        label: 'rotation period',
        field: 'rotation_period',
        sortable: true
      },
      { name: 'diameter', label: 'Diameter', field: 'diameter' },
      { name: 'climate', label: 'Climate', field: 'climate' },
      { name: 'gravity', label: 'Gravity', field: 'gravity' }
    ]);

    onMounted(async () => {
      await getPlanets();
    });

    const getPlanets = async () => {
      isLoading.value = true;
      console.log(API_URL);
      try {
        const response: GetPlanetResponse = await axios.get(
          `${API_URL}/planets`
        );
        planets.value = response.data.results;
        isLoading.value = false;
      } catch (err) {
        isLoading.value = false;
        throw err;
      }
    };

    return {
      planets,
      columns,
      isLoading
    };
  }
});

/*interface Props {
  title: string;
}
withDefaults(defineProps<Props>(), {});*/
</script>
