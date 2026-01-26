import axios from 'axios';

// Usar la variable de entorno, con fallback a localhost para desarrollo
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para manejar errores globalmente
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Error de API:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const citasAPI = {
  // Obtener especialidades
  getEspecialidades: () => api.get('/api/especialidades'),
  
  // Crear una cita
  createCita: (formData) => api.post('/api/citas', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
  
  // Descargar orden PDF
  downloadOrden: (codigoCita) => 
    api.get(`/api/citas/${codigoCita}/orden`, {
      responseType: 'blob', // Importante para descargar archivos
    }),
};

export default api;