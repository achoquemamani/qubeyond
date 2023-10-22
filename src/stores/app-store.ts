import { defineStore } from 'pinia';
import Package from '../../package.json';

export const useAppStore = defineStore('app', {
  state: () => ({
    version: Package.version,
    companyName: process.env.COMPANY_NAME
  }),
  getters: {
    getVersion: (state) => state.version,
    getCompanyName: (state) => state.companyName
  },
  actions: {}
});
