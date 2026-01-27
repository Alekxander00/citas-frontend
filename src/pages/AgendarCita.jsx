import React, { useState, useEffect, useRef } from 'react';
import { 
  FaHeartbeat,
  FaShieldAlt,
  FaInfoCircle
} from 'react-icons/fa';

// Importar componentes de pasos
import Paso1DatosPersonales from './Paso1DatosPersonales';
import Paso2InformacionMedica from './Paso2InformacionMedica';
import Paso3Disponibilidad from './Paso3Disponibilidad';
import Paso4Documentacion from './Paso4Documentacion';
import Paso5Resumen from './Paso5Resumen';
import WizardNavigation from '../components/WizardNavigation';
import AnimatedBackground from '../components/AnimatedBackground';
import Footer from '../components/Footer';
import { crearCita, obtenerEspecialidades } from '../services/api';
import '../App.css';

const AgendarCita = () => {
  // Estados para el formulario
  const [tipoIdentificacion, setTipoIdentificacion] = useState('');
  const [numeroIdentificacion, setNumeroIdentificacion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [especialidadCodigo, setEspecialidadCodigo] = useState('');
  const [diaSemana, setDiaSemana] = useState('');
  const [jornada, setJornada] = useState('');
  const [archivo, setArchivo] = useState(null);
  
  // Estados para el wizard
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;
  
  // Estados para la respuesta
  const [mensajeExito, setMensajeExito] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  
  // Estados para PDF y especialidades
  const [codigoCita, setCodigoCita] = useState(null);
  const [descargandoPDF, setDescargandoPDF] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState('');
  const [especialidades, setEspecialidades] = useState([]);
  
  const API_URL = import.meta.env.VITE_API_URL || 'https://citas-backend-production-3949.up.railway.app';

  // Cargar especialidades al inicio
  useEffect(() => {
    const cargarEspecialidades = async () => {
      try {
        const data = await obtenerEspecialidades();
        if (data && data.especialidades) {
          setEspecialidades(data.especialidades);
        }
      } catch (err) {
        console.error('Error cargando especialidades:', err);
      }
    };
    
    cargarEspecialidades();
  }, []);

  // Validar paso actual
  const isValidStep = () => {
    switch (currentStep) {
      case 1:
        return tipoIdentificacion && 
               numeroIdentificacion && numeroIdentificacion.length >= 5 && 
               telefono && telefono.length >= 7;
      case 2:
        return especialidadCodigo;
      case 3:
        return diaSemana && jornada;
      case 4:
        return archivo;
      case 5:
        return true; // El resumen siempre es válido
      default:
        return false;
    }
  };

  // Navegación
  const handleNext = () => {
    if (currentStep < totalSteps && isValidStep()) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleEditStep = (step) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Función para generar confeti
  const ConfettiEffect = () => {
    if (!showConfetti) return null;
    
    return (
      <div className="confetti-container">
        {[...Array(100)].map((_, i) => (
          <div 
            key={i}
            className="confetti"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              backgroundColor: `hsl(${Math.random() * 360}, 100%, 60%)`,
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
            }}
          />
        ))}
      </div>
    );
  };

  // Enviar formulario
  const handleSubmit = async () => {
    setError('');
    setMensajeExito('');
    setCargando(true);

    try {
      const formData = new FormData();
      formData.append('tipo_identificacion', tipoIdentificacion);
      formData.append('numero_identificacion', numeroIdentificacion);
      formData.append('telefono', telefono);
      formData.append('especialidad_codigo', especialidadCodigo);
      formData.append('dia_semana', diaSemana);
      formData.append('jornada', jornada);
      formData.append('orden_pdf', archivo);

      const respuesta = await crearCita(formData);
      
      setMensajeExito(respuesta.mensaje || 'Su solicitud de cita ha sido registrada correctamente. En los próximos días será contactado telefónicamente para confirmar la fecha y hora exactas de su cita.');
      setCodigoCita(respuesta.codigo_cita || respuesta.data?.codigo_cita);
      setShowConfetti(true);
      
      if (respuesta.codigo_cita) {
        const url = `${API_URL}/api/citas/${respuesta.codigo_cita}/orden`;
        setDownloadUrl(url);
      }
      
    } catch (err) {
      console.error('Error al crear la cita:', err);
      setError(err.error || 'Ocurrió un error al agendar la cita. Por favor, intente nuevamente.');
    } finally {
      setCargando(false);
    }
  };

  // Descargar PDF
  const handleDescargarPDF = async () => {
    if (!codigoCita) return;
    
    try {
      setDescargandoPDF(true);
      await descargarOrdenPDF(codigoCita);
    } catch (error) {
      console.error('Error al descargar PDF:', error);
      setError('Error al descargar el PDF. Intente hacer clic en el enlace manualmente.');
    } finally {
      setDescargandoPDF(false);
    }
  };

  // Resetear formulario
  const resetForm = () => {
    setTipoIdentificacion('');
    setNumeroIdentificacion('');
    setTelefono('');
    setEspecialidadCodigo('');
    setDiaSemana('');
    setJornada('');
    setArchivo(null);
    setCurrentStep(1);
    setCodigoCita(null);
    setDownloadUrl('');
    setError('');
    setMensajeExito('');
    setShowConfetti(false);
  };

  return (
    <div className="app-container">
      <AnimatedBackground />
      <ConfettiEffect />
      
      <div className="agendar-cita-container wizard-container">
        {/* Header */}
        <div className="header-section">
          <div className="title-container">
            <FaHeartbeat className="title-icon" />
            <h1>Agendamiento de Citas Médicas</h1>
          </div>
          <p className="subtitle">
            <FaShieldAlt /> Sistema para pacientes no contributivos
          </p>
        </div>

        {/* Wizard Navigation */}
        <WizardNavigation
          currentStep={currentStep}
          totalSteps={totalSteps}
          onNext={handleNext}
          onPrev={handlePrev}
          onSubmit={handleSubmit}
          isValidStep={isValidStep()}
          isSubmitting={cargando}
          showSubmit={currentStep === totalSteps}
        />

        {/* Steps Content */}
        <div className="wizard-content">
          {currentStep === 1 && (
            <Paso1DatosPersonales
              tipoIdentificacion={tipoIdentificacion}
              setTipoIdentificacion={setTipoIdentificacion}
              numeroIdentificacion={numeroIdentificacion}
              setNumeroIdentificacion={setNumeroIdentificacion}
              telefono={telefono}
              setTelefono={setTelefono}
            />
          )}

          {currentStep === 2 && (
            <Paso2InformacionMedica
              especialidadCodigo={especialidadCodigo}
              setEspecialidadCodigo={setEspecialidadCodigo}
            />
          )}

          {currentStep === 3 && (
            <Paso3Disponibilidad
              diaSemana={diaSemana}
              setDiaSemana={setDiaSemana}
              jornada={jornada}
              setJornada={setJornada}
            />
          )}

          {currentStep === 4 && (
            <Paso4Documentacion
              archivo={archivo}
              setArchivo={setArchivo}
              error={error}
            />
          )}

          {currentStep === 5 && (
            <Paso5Resumen
              tipoIdentificacion={tipoIdentificacion}
              numeroIdentificacion={numeroIdentificacion}
              telefono={telefono}
              especialidadCodigo={especialidadCodigo}
              especialidades={especialidades}
              diaSemana={diaSemana}
              jornada={jornada}
              archivo={archivo}
              onEditStep={handleEditStep}
            />
          )}

          {/* Alertas */}
          {mensajeExito && (
            <div className="alert alert-success success-alert">
              <div className="alert-content">
                <FaInfoCircle className="alert-icon" />
                <div className="alert-details">
                  <h3>¡Solicitud Registrada Exitosamente!</h3>
                  <p>{mensajeExito}</p>
                  
                  {codigoCita && (
                    <div className="download-section">
                      <p><strong>Código de cita:</strong> {codigoCita}</p>
                      {downloadUrl && (
                        <a 
                          href={downloadUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="btn btn-download"
                        >
                          Descargar Orden PDF
                        </a>
                      )}
                    </div>
                  )}
                  
                  <button
                    type="button"
                    className="btn btn-new-request"
                    onClick={resetForm}
                  >
                    Nueva Solicitud
                  </button>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="alert alert-error">
              <div className="alert-content">
                <FaInfoCircle className="alert-icon" />
                <div>
                  <h3>Error</h3>
                  <p>{error}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Información adicional */}
        <div className="wizard-info">
          <FaInfoCircle className="wizard-info-icon" />
          <p>
            <strong>Recuerde:</strong> Este es un sistema para pacientes no contributivos. 
            No se requiere registro previo. Será contactado telefónicamente para confirmar su cita.
          </p>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default AgendarCita;