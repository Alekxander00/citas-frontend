import React from 'react';
import { FaFilePdf, FaCheck, FaInfoCircle } from 'react-icons/fa';
import FileUpload from '../components/FileUpload';

const Paso4Documentacion = ({ 
  archivo, 
  setArchivo,
  error,
  onAutoAdvance
}) => {
  return (
    <div className="form-step">
      <div className="step-header">
        <div className="step-number">4</div>
        <h2>
          <FaFilePdf className="step-icon" /> 
          Documentación
        </h2>
        <p className="step-description">
          Adjunte la orden o autorización médica si la tiene
        </p>
      </div>

      <div className="step-content">
        <div className="info-box">
          <FaInfoCircle className="info-icon" />
          <p>
            <strong>Este paso es opcional:</strong> Si no tiene el documento PDF de su orden o autorización a la mano, no se preocupe. Puede tocar el botón de abajo para continuar sin subir nada.
          </p>
        </div>
        
        <FileUpload
          archivo={archivo}
          setArchivo={setArchivo}
          error={error && error.includes('archivo') ? error : ''}
          onSkip={onAutoAdvance}
        />
        
        {archivo && (
          <div className="file-success">
            <FaCheck className="success-icon" />
            <span>Archivo listo: <strong>{archivo.name}</strong> ({(archivo.size / 1024 / 1024).toFixed(2)} MB)</span>
          </div>
        )}
      </div>

      <div className="step-info">
        <p>Si ya seleccionó su archivo o no tiene uno, presione "Siguiente" o "Continuar sin subir" para avanzar.</p>
      </div>
    </div>
  );
};

export default Paso4Documentacion;