import axios from 'axios';

// ✅ CAMBIA ESTA URL según tu entorno
const API_URL = import.meta.env.VITE_API_URL || 'https://citas-backend-production-3949.up.railway.app';

// Crear instancia de axios con configuración base
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000, // 10 segundos timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para logging
api.interceptors.request.use(
  (config) => {
    console.log(`📤 ${config.method?.toUpperCase()} a: ${config.baseURL}${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Error en solicitud:', error);
    return Promise.reject(error);
  }
);

// Interceptor para respuestas
api.interceptors.response.use(
  (response) => {
    console.log(`✅ Respuesta recibida de ${response.config.url}:`, response.status);
    return response;
  },
  (error) => {
    console.error(`❌ Error en respuesta de ${error.config?.url}:`, error.message);
    
    if (error.response) {
      console.error('📊 Datos del error:', error.response.data);
      console.error('🔢 Status:', error.response.status);
    } else if (error.request) {
      console.error('🌐 No se recibió respuesta del servidor');
    }
    
    return Promise.reject(error);
  }
);

// Obtener especialidades
export const obtenerEspecialidades = async () => {
  try {
    console.log('🔄 Iniciando solicitud de especialidades...');
    const response = await api.get('/api/especialidades');
    
    console.log('📊 Respuesta completa:', response);
    console.log('📦 Datos:', response.data);
    
    return response.data;
  } catch (error) {
    console.error('💥 Error crítico al obtener especialidades:', error);
    
    // Para desarrollo, devolver datos de prueba
    if (import.meta.env.DEV) {
      console.warn('⚠️  Usando datos de prueba para desarrollo');
      return {
        success: true,
        cantidad: 5,
        especialidades: [
          { codigo: 1, nombre: 'Medicina General' },
          { codigo: 2, nombre: 'Pediatría' },
          { codigo: 3, nombre: 'Ginecología' },
          { codigo: 4, nombre: 'Cardiología' },
          { codigo: 5, nombre: 'Dermatología' },
        ]
      };
    }
    
    throw error;
  }
};

// Crear cita
export const crearCita = async (formData) => {
  try {
    console.log('📤 Enviando datos de cita...', formData);
    
    const response = await axios.post(`${API_URL}/api/citas`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 15000,
    });
    
    console.log('✅ Cita creada exitosamente:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error al crear cita:', error);
    
    let errorMessage = 'Error al crear la cita';
    
    if (error.response) {
      console.error('📊 Error del servidor:', error.response.data);
      errorMessage = error.response.data.error || errorMessage;
    } else if (error.code === 'ECONNABORTED') {
      errorMessage = 'La solicitud tardó demasiado. Inténtalo de nuevo.';
    } else if (error.message.includes('Network Error')) {
      errorMessage = 'No se pudo conectar con el servidor. Verifica tu conexión.';
    }
    
    throw { error: errorMessage };
  }
};

export default api;