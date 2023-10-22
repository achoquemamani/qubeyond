<template>
  <q-toolbar>
    <q-toolbar-title @click="redirectToMainPage">
      <div class="container-title">{{ companyName }}</div>
    </q-toolbar-title>
    <div>v{{ version }}</div>
  </q-toolbar>
  <DarkModeToggle></DarkModeToggle>
  <LanguageSelect></LanguageSelect>
</template>

<style scoped lang="scss">
.container-title {
  width: max-content;
  cursor: pointer;
}
</style>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import DarkModeToggle from 'components/DarkModeToggle.vue';
import { useAppStore } from 'stores/app-store';
import { useRouter } from 'vue-router';
import LanguageSelect from './LanguageSelect.vue';

export default defineComponent({
  name: 'HeaderInfo',
  components: {
    DarkModeToggle,
    LanguageSelect
  },
  setup() {
    const router = useRouter();
    const store = useAppStore();
    const version = computed(() => store.getVersion);
    const companyName = computed(() => store.getCompanyName);
    const redirectToMainPage = () => {
      router.push('/');
    };
    return {
      version,
      companyName,
      redirectToMainPage
    };
  }
});
</script>
