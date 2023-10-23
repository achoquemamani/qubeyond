<template>
  <q-btn
    size="xs"
    :disabled="!hasInternet"
    round
    color="primaryblue-5"
    icon="fa fa-wifi"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'CheckInternet',
  setup() {
    const hasInternet = ref(navigator.onLine);
    return {
      hasInternet
    };
  }
});
</script>
