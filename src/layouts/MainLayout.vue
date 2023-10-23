<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <HeaderInfo></HeaderInfo>

        <div></div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header>{{
          `${t('pages.mainLayout.sideBarText')}`
        }}</q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-footer>
      <q-toolbar>
        <q-toolbar-title class="text-center footer"
          >© 2023 {{ companyName }}</q-toolbar-title
        >
      </q-toolbar>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style scoped lang="scss">
.footer {
  font-size: 18px;
}
</style>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import EssentialLink, {
  EssentialLinkProps
} from 'components/EssentialLink.vue';
import HeaderInfo from 'components/HeaderInfo.vue';
import { useI18n } from 'vue-i18n';
import { useAppStore } from 'stores/app-store';

export default defineComponent({
  name: 'MainLayout',
  components: {
    EssentialLink,
    HeaderInfo
  },
  setup() {
    const store = useAppStore();
    const companyName = store.getCompanyName;
    const { t } = useI18n();
    const leftDrawerOpen = ref(false);
    const essentialLinks: EssentialLinkProps[] = [
      {
        title: `${t('pages.mainLayout.options.planets.text')}`,
        caption: `${t('pages.mainLayout.options.planets.subtext')}`,
        icon: 'table_view'
      }
    ];

    function toggleLeftDrawer() {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    }

    return { companyName, leftDrawerOpen, essentialLinks, t, toggleLeftDrawer };
  }
});
</script>
