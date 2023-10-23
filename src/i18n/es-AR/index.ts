// This is just an example,
// so you can safely delete all default props below

export default {
  failed: 'Falló Action',
  success: 'Action exitoso',
  pages: {
    index: {
      title: 'Planets',
      columns: {
        name: 'Nombre',
        rotationPeriod: 'Periodo de rotación',
        diameter: 'Diametro',
        climate: 'Clima',
        gravity: 'Gravedad',
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
