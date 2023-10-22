<template>
  <router-view />
</template>

<script lang="ts">
import '/node_modules/flag-icons/css/flag-icons.min.css';
import { defineComponent } from 'vue';
import { useUserStore } from 'stores/user-store';

export default defineComponent({
  name: 'App',
  setup() {
    const store = useUserStore();
    store.loadConfiguration();
  }
});
</script>
