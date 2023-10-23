import { defineStore } from 'pinia';
import { Dark, useQuasar } from 'quasar';
import { LocalStorage } from 'quasar';
import { UserConfiguration, Language } from 'components/models';

export const useUserStore = defineStore('user', {
  state: () => ({
    isDark:
      LocalStorage.getItem('isDark') != null
        ? LocalStorage.getItem('isDark') === 'true'
          ? true
          : false
        : false,
    /* eslint-disable @typescript-eslint/ban-ts-comment */
    //@ts-ignore
    language: LocalStorage.getItem('language') ? JSON.parse(LocalStorage.getItem('language')) : {
      value: 'en-US',
      icon: 'fi fi-us',
      langIso: 'en-US'
    }
  }),
  getters: {
    getLanguage: (state) => state.language.value,
    getDark: (state) => state.isDark,
    getConfiguration(state): UserConfiguration {
      return {
        isDark: state.isDark
      };
    }
  },
  actions: {
    setDark(isDark: boolean) {
      Dark.set(isDark);
      this.isDark = isDark;
      localStorage.setItem('isDark', isDark ? 'true' : 'false');
    },
    setLanguage(language: Language) {
      this.language = language;
      localStorage.setItem('language', JSON.stringify(language));
    },
    setConfiguration(configuration: UserConfiguration) {
      this.isDark = configuration.isDark;
    },
    loadConfiguration() {
      const $q = useQuasar();
      this.setDark(this.isDark);
      import('../../node_modules/quasar/lang/' + this.language.langIso).then(
        (lang) => {
          $q.lang.set(lang.default);
        }
      );
    }
  }
});
