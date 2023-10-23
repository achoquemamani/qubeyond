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
import { useUserStore } from 'stores/user-store';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'LanguageSelect',
  watch: {
    selectedOption(newVal) {
      this.handleChangeLanguage(newVal);
    }
  },
  setup() {
    const store = useUserStore();
    const options = [
      {
        value: 'es-AR',
        icon: 'fi fi-ar',
        langIso: 'es'
      },
      {
        value: 'en-US',
        icon: 'fi fi-us',
        langIso: 'en-US'
      }
    ];
    const defaultOption = options.find((option) => {
      return option.value === store.getLanguage;
    });
    const selectedOption = ref(defaultOption ?? options[0]);

    const handleChangeLanguage = (selectedOption: {
      value: string;
      icon: string;
      langIso: string;
    }) => {
      store.setLanguage(selectedOption);
      window.location.reload();
    };
    return {
      selectedOption,
      options,
      handleChangeLanguage
    };
  }
});
</script>
