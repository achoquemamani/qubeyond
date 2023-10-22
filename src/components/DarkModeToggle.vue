<template>
  <q-toggle
    checked-icon="fa fa-moon"
    unchecked-icon="fa fa-sun"
    color="blue-5"
    v-model="isDark"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useUserStore } from 'stores/user-store';

export default defineComponent({
  name: 'DarkModeToggle',
  watch: {
    isDark(newVal: boolean) {
      this.store.setDark(newVal);
    }
  },
  setup() {
    const store = useUserStore();
    const isDark = ref(store.getDark);
    return {
      isDark,
      store
    };
  }
});
</script>
