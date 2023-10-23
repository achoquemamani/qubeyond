<template>
  <q-page class="row justify-evenly q-ma-md">
    <div class="col-sm-12 row">
      <PlanetTable :title="title"></PlanetTable>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import PlanetTable from 'components/PlanetTable.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-ignore
const title = `${t('pages.index.title')}`;
</script>
