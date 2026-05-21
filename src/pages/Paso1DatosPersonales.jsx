import React, { useState, useEffect } from 'react';
import { FaUser, FaIdCard, FaPhone } from 'react-icons/fa';
import SelectIdentificacion from '../components/SelectIdentificacion';
import InputNumerico from '../components/InputNumerico';

const Paso1DatosPersonales = ({ 
  tipoIdentificacion, 
  setTipoIdentificacion,
  numeroIdentificacion,
  setNumeroIdentificacion,
  telefono,
  setTelefono,
  onAutoAdvance
}) => {
  const [hasInteracted, setHasInteracted] = useState(false);

  // Auto-avance automático al Paso 2 cuando los datos estén completos y válidos Y el usuario haya interactuado
  useEffect(() => {
    const isValid = 
      tipoIdentificacion && 
      numeroIdentificacion && numeroIdentificacion.length >= 5 && 
      telefono && telefono.length >= 7;

    if (isValid && hasInteracted && onAutoAdvance) {
      const timer = setTimeout(() => {
        onAutoAdvance();
      }, 1000); // 1 segundo de espera para que terminen de escribir el celular
      return () => clearTimeout(timer);
    }
  }, [tipoIdentificacion, numeroIdentificacion, telefono, hasInteracted, onAutoAdvance]);

  const handleTipoChange = (e) => {
    setTipoIdentificacion(e.target.value);
    setHasInteracted(true);
  };

  const handleNumeroChange = (e) => {
    setNumeroIdentificacion(e.target.value);
    setHasInteracted(true);
  };

  const handleTelefonoChange = (e) => {
    setTelefono(e.target.value);
    setHasInteracted(true);
  };

  return (
    <div className="form-step active">
      <div className="step-header">
        <div className="step-number">1</div>
        <h2>
          <FaUser className="step-icon" /> 
          Datos Personales
        </h2>
        <p className="step-description">
          Complete sus datos personales para proceder con la solicitud
        </p>
      </div>

      <div className="step-content">
        <SelectIdentificacion
          value={tipoIdentificacion}
          onChange={handleTipoChange}
          required={true}
        />

        <InputNumerico
          label={
            <>
              <FaIdCard /> Número de Identificación
            </>
          }
          name="numero_identificacion"
          value={numeroIdentificacion}
          onChange={handleNumeroChange}
          required={true}
          minLength="5"
          maxLength="20"
          placeholder="Ej: 1234567890"
        />

        <InputNumerico
          label={
            <>
              <FaPhone /> Celular (debe tener WhatsApp) 📱
            </>
          }
          name="telefono"
          value={telefono}
          onChange={handleTelefonoChange}
          required={true}
          minLength="7"
          maxLength="15"
          placeholder="Ej: 3001234567"
        />
      </div>
    </div>
  );
};

export default Paso1DatosPersonales;