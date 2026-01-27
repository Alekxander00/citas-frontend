import axios from 'axios';

// ✅ CAMBIA ESTA URL por la de tu Railway
const API_URL = 'https://citas-backend-production-3949.up.railway.app';

// Para desarrollo futuro, puedes usar variables de entorno:
// const API_URL = import.meta.env.VITE_API_URL || 'https://citas-backend-production-3949.up.railway.app';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const obtenerEspecialidades = async () => {
  try {
    console.log('📡 Conectando a:', API_URL + '/api/especialidades');
    const response = await api.get('/api/especialidades');
    console.log('✅ Respuesta recibida:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error al obtener especialidades:', error.message);
    console.error('URL intentada:', API_URL + '/api/especialidades');
    throw error;
  }
};

export const crearCita = async (datosCita, archivoPDF) => {
  try {
    const formData = new FormData();
    Object.keys(datosCita).forEach(key => {
      formData.append(key, datosCita[key]);
    });
    formData.append('orden_pdf', archivoPDF);
    
    const response = await axios.post(API_URL + '/api/citas', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('Error al crear cita:', error);
    throw error;
  }
};

export default api;