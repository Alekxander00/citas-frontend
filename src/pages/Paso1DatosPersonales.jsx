import React from 'react';
import { FaUser, FaIdCard, FaPhone } from 'react-icons/fa';
import SelectIdentificacion from '../components/SelectIdentificacion';
import InputNumerico from '../components/InputNumerico';

const Paso1DatosPersonales = ({ 
  tipoIdentificacion, 
  setTipoIdentificacion,
  numeroIdentificacion,
  setNumeroIdentificacion,
  telefono,
  setTelefono
}) => {
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
          onChange={(e) => setTipoIdentificacion(e.target.value)}
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
          onChange={(e) => setNumeroIdentificacion(e.target.value)}
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
          onChange={(e) => setTelefono(e.target.value)}
          required={true}
          minLength="7"
          maxLength="15"
          placeholder="Ej: 3001234567"
        />
      </div>

      <div className="step-info step-info-whatsapp">
        <p><strong>⚠️ Importante:</strong> Ingrese un número de celular que tenga <strong>WhatsApp activo</strong>. Por ese medio coordinaremos la fecha y hora final de su cita médica con el doctor.</p>
      </div>
    </div>
  );
};

export default Paso1DatosPersonales;