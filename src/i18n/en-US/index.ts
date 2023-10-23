// This is just an example,
// so you can safely delete all default props below

export default {
  failed: 'Action failed',
  success: 'Action was successful',
  pages: {
    index: {
      title: 'Planets',
      inputToSearch: 'Search',
      btnCleanSearchText: 'Clean filters',
      columns: {
        name: 'Name',
        rotationPeriod: 'Rotation period',
        orbitalPeriod: 'Orbital period',
        diameter: 'Diameter',
        climate: 'Climate',
        gravity: 'Gravity',
        terrain: 'Terrain',
        surfaceWater: 'Surface water',
        population: 'Population'
      },
      btnExportCsv: 'Export to csv',
      loading: 'Loading...'
    },
    mainLayout: {
      sideBarText: 'Important links',
      options: {
        planets: {
          text: 'Planets',
          subtext: 'Information',
        }
      }
    }
  }
};
