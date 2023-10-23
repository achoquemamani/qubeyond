// This is just an example,
// so you can safely delete all default props below

export default {
  failed: 'Falló Action',
  success: 'Action exitoso',
  pages: {
    index: {
      title: 'Planetas',
      inputToSearch: 'Buscar',
      btnCleanSearchText: 'Limpiar filtros',
      columns: {
        name: 'Nombre',
        rotationPeriod: 'Periodo de rotación',
        orbitalPeriod: 'Periodo orbital',
        diameter: 'Diametro',
        climate: 'Clima',
        gravity: 'Gravedad',
        terrain: 'Terreno',
        surfaceWater: 'Agua superficial',
        population: 'Población'
      },
      btnExportCsv: 'Exportar a csv',
      loading: 'Cargando...'
    },
    mainLayout: {
      sideBarText: 'Links importantes',
      options: {
        planets: {
          text: 'Planetas',
          subtext: 'Información',
        }
      }
    }
  }
};
