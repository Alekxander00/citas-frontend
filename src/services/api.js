import axios from 'axios';

// URL base de la API
const API_URL = import.meta.env.VITE_API_URL || 'https://citas-backend-production-3949.up.railway.app';

// Obtener especialidades
export const obtenerEspecialidades = async () => {
  try {
    console.log('🔄 Solicitando especialidades desde:', `${API_URL}/api/especialidades`);
    
    const response = await axios.get(`${API_URL}/api/especialidades`, {
      timeout: 10000,
    });
    
    console.log('✅ Respuesta de especialidades:', response.data);
    return response.data;
    
  } catch (error) {
    console.error('❌ Error al obtener especialidades:', error);
    
    // Datos de respaldo para desarrollo
    if (import.meta.env.DEV) {
      console.log('⚠️  Usando datos de prueba para desarrollo');
      return {
        success: true,
        cantidad: 15,
        especialidades: [
          { codigo: 1, nombre: 'Medicina General' },
          { codigo: 2, nombre: 'Pediatría' },
          { codigo: 3, nombre: 'Ginecología' },
          { codigo: 4, nombre: 'Cardiología' },
          { codigo: 5, nombre: 'Dermatología' },
          { codigo: 6, nombre: 'Ortopedia' },
          { codigo: 7, nombre: 'Oftalmología' },
          { codigo: 8, nombre: 'Odontología' },
          { codigo: 9, nombre: 'Psicología' },
          { codigo: 10, nombre: 'Nutrición' },
          { codigo: 11, nombre: 'Endocrinología' },
          { codigo: 12, nombre: 'Gastroenterología' },
          { codigo: 13, nombre: 'Neurología' },
          { codigo: 14, nombre: 'Urología' },
          { codigo: 15, nombre: 'Traumatología' }
        ]
      };
    }
    
    throw error;
  }
};

// Crear cita
export const crearCita = async (formData) => {
  try {
    console.log('📤 Enviando datos de cita...');
    
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

export default {
  obtenerEspecialidades,
  crearCita
};