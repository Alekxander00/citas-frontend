import React, { useState, useEffect } from 'react';
import { 
  FaHeartbeat,
  FaInfoCircle
} from 'react-icons/fa';

// Importar componentes de pasos
import Paso1DatosPersonales from './Paso1DatosPersonales';
import Paso2InformacionMedica from './Paso2InformacionMedica';
import Paso3Disponibilidad from './Paso3Disponibilidad';
import Paso4Documentacion from './Paso4Documentacion';
import Paso5Resumen from './Paso5Resumen';
import WizardNavigation from '../components/WizardNavigation';
import ProgressIndicator from '../components/ProgressIndicator';
import AnimatedBackground from '../components/AnimatedBackground';
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
  
  // Especialidades
  const [especialidades, setEspecialidades] = useState([]);
  
  // Cargar especialidades al inicio
  useEffect(() => {
    const cargarEspecialidades = async () => {
      try {
        const data = await obtenerEspecialidades();
        if (data && data.especialidades) {
          setEspecialidades(data.especialidades);
        } else if (data && data.data) {
          setEspecialidades(data.data);
        } else if (Array.isArray(data)) {
          setEspecialidades(data);
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
        return !!especialidadCodigo;
      case 3:
        return !!diaSemana && !!jornada;
      case 4:
        return true; // PDF es opcional
      case 5:
        return true; // Resumen siempre es válido
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
      if (archivo) {
        formData.append('orden_pdf', archivo);
      }

      const respuesta = await crearCita(formData);
      setMensajeExito(respuesta.mensaje || 'Su solicitud de cita ha sido registrada correctamente.');
      
    } catch (err) {
      console.error('Error al crear la cita:', err);
      setError(err.error || 'Ocurrió un error al agendar la cita. Por favor, intente nuevamente.');
    } finally {
      setCargando(false);
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
    setError('');
    setMensajeExito('');
  };

  // Manejador para cambiar especialidad y auto-avanzar
  const handleEspecialidadChange = (codigo) => {
    setEspecialidadCodigo(codigo);
    setTimeout(() => {
      setCurrentStep(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 300);
  };

  // Manejadores para cambiar disponibilidad y auto-avanzar
  const handleDiaSemanaChange = (dia) => {
    setDiaSemana(dia);
    if (jornada) {
      setTimeout(() => {
        setCurrentStep(4);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 300);
    }
  };

  const handleJornadaChange = (jorn) => {
    setJornada(jorn);
    if (diaSemana) {
      setTimeout(() => {
        setCurrentStep(4);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 300);
    }
  };

  return (
    <div className="app-container">
      <AnimatedBackground />
      
      <div className="agendar-cita-container wizard-container">
        {/* Header */}
        <div className="header-section">
          <div className="title-container">
            <FaHeartbeat className="title-icon" />
            <h1>Agendamiento de Citas Médicas</h1>
          </div>
        </div>

        {mensajeExito ? (
          /* PANTALLA DE ÉXITO PREMIUM PARA LA TERCERA EDAD */
          <div className="success-screen-glass animate-fade-in">
            <div className="checkmark-wrapper">
              <svg className="success-checkmark-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                <circle className="success-checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
                <path className="success-checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
              </svg>
            </div>
            <h2 className="success-title">¡Cita Solicitada con Éxito!</h2>
            <p className="success-subtitle">Hemos recibido su solicitud correctamente.</p>
            
            <div className="success-steps-box">
              <p className="success-step-info-text">
                <strong>📞 ¿Qué sigue ahora?</strong>
                <br />
                Nos comunicaremos con usted por <strong>teléfono</strong> o por mensaje de <strong>WhatsApp</strong> para confirmarle el día y la hora exacta de su cita médica con el doctor.
              </p>
            </div>

            <div className="success-actions">
              <button
                type="button"
                className="btn btn-new-request-glass"
                onClick={resetForm}
              >
                Pedir Otra Cita Médica
              </button>
            </div>
          </div>
        ) : (
          /* FORMULARIO WIZARD ACCESIBLE */
          <>
            {/* 1. Indicador de progreso (Barra superior) */}
            <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />

            {/* 2. Contenido de los pasos */}
            <div className="wizard-content">
              {currentStep === 1 && (
                <Paso1DatosPersonales
                  tipoIdentificacion={tipoIdentificacion}
                  setTipoIdentificacion={setTipoIdentificacion}
                  numeroIdentificacion={numeroIdentificacion}
                  setNumeroIdentificacion={setNumeroIdentificacion}
                  telefono={telefono}
                  setTelefono={setTelefono}
                  onAutoAdvance={handleNext}
                />
              )}

              {currentStep === 2 && (
                <Paso2InformacionMedica
                  especialidadCodigo={especialidadCodigo}
                  setEspecialidadCodigo={handleEspecialidadChange}
                />
              )}

              {currentStep === 3 && (
                <Paso3Disponibilidad
                  diaSemana={diaSemana}
                  setDiaSemana={handleDiaSemanaChange}
                  jornada={jornada}
                  setJornada={handleJornadaChange}
                />
              )}

              {currentStep === 4 && (
                <Paso4Documentacion
                  archivo={archivo}
                  setArchivo={setArchivo}
                  error={error}
                  onAutoAdvance={handleNext}
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
            </div>

            {/* Manejo de errores */}
            {error && (
              <div className="alert alert-error">
                <div className="alert-content">
                  <FaInfoCircle className="alert-icon" />
                  <div>
                    <h3>Error al procesar solicitud</h3>
                    <p>{error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* 3. Navegación del wizard (Botones inferiores) */}
            <WizardNavigation
              currentStep={currentStep}
              totalSteps={totalSteps}
              onNext={handleNext}
              onPrev={handlePrev}
              onSubmit={handleSubmit}
              isValidStep={isValidStep()}
              isSubmitting={cargando}
              archivo={archivo}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default AgendarCita;