import { defineStore } from 'pinia';
import { Dark } from 'quasar';
import { LocalStorage } from 'quasar';
import { UserConfiguration } from 'components/models';

export const useUserStore = defineStore('user', {
  state: () => ({
    isDark:
      LocalStorage.getItem('isDark') != null
        ? LocalStorage.getItem('isDark') === 'true'
          ? true
          : false
        : false
  }),
  getters: {
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
    setConfiguration(configuration: UserConfiguration) {
      this.isDark = configuration.isDark;
    },
    loadConfiguration() {
      this.setDark(this.isDark);
    }
  }
});
