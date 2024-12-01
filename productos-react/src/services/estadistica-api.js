import api from './api';

const estadisticaApi = {
  obtenerEstadisticas: async () => {
    try {
      const response = await api.get('/estadisticas');
      console.log(response.data);  // Esto te permitirá ver los datos que se reciben de la API
      return response.data;
    } catch (error) {
      console.error('Error al obtener estadísticas:', error);
      throw error;
    }
  }
};

export default estadisticaApi;
