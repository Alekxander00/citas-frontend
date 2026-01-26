import axios from 'axios';

// URL base - Vite usa import.meta.env
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Función para obtener especialidades
export const obtenerEspecialidades = async () => {
  try {
    const response = await api.get('/api/especialidades');
    return response.data;
  } catch (error) {
    console.error('Error al obtener especialidades:', error);
    throw error;
  }
};

// Función para crear una cita
export const crearCita = async (datosCita, archivoPDF) => {
  try {
    // Usar FormData para enviar archivo
    const formData = new FormData();
    
    // Agregar todos los campos del formulario
    Object.keys(datosCita).forEach(key => {
      formData.append(key, datosCita[key]);
    });
    
    // Agregar el archivo PDF
    formData.append('orden_pdf', archivoPDF);
    
    // Enviar con headers multipart/form-data
    const response = await api.post('/api/citas', formData, {
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

// Exportar por si necesitas la instancia directamente
export default api;