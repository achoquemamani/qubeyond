<template>
  <q-select
    filled
    v-model="selectedOption"
    :options="options"
    color="light-green-8"
  >
    <template v-slot:selected>
      <span :class="selectedOption.icon"></span>
    </template>
    <template v-slot:option="scope">
      <q-item v-bind="scope.itemProps">
        <q-item-section avatar>
          <span :class="scope.opt.icon"></span>
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'LanguageSelect',
  watch: {
    selectedOption(newVal) {
      this.handleChangeLanguage(newVal);
    }
  },
  setup() {
    const options = [
      {
        value: 'es-AR',
        icon: 'fi fi-ar'
      },
      {
        value: 'en-US',
        icon: 'fi fi-us'
      }
    ];
    const selectedOption = ref(options[0]);
    const handleChangeLanguage = (selectedOption: {
      value: string;
      icon: string;
    }) => {
      console.log(selectedOption.value);
    };
    return {
      selectedOption,
      options,
      handleChangeLanguage
    };
  }
});
</script>
