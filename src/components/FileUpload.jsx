import React, { useRef, useState } from 'react';
import { FaCloudUploadAlt, FaFilePdf, FaTimes, FaCheckCircle } from 'react-icons/fa';

const FileUpload = ({ archivo, setArchivo, error, onSkip }) => {
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFile = (file) => {
    if (file) {
      if (file.type !== 'application/pdf') {
        alert('Solo se permiten archivos PDF.');
        return;
      }
      if (file.size > 15 * 1024 * 1024) {
        alert('El archivo no debe superar los 15 MB.');
        return;
      }
      setArchivo(file);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="form-group document-upload-group">
      <label className="section-label">Subir Orden o Autorización Médica <span className="label-opcional">(Opcional)</span></label>
      <p className="label-ayuda">Si tiene una foto o documento PDF de su orden, súbalo aquí. Si no lo tiene, no se preocupe y continúe:</p>

      <div 
        className={`drag-drop-zone ${dragActive ? 'active' : ''} ${archivo ? 'has-file' : ''}`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".pdf,application/pdf"
          style={{ display: 'none' }}
        />

        {!archivo ? (
          <div className="upload-prompt" onClick={handleButtonClick}>
            <FaCloudUploadAlt className="upload-icon-pulse" />
            <p className="upload-text-main">Toque aquí o arrastre su archivo PDF</p>
            <p className="upload-text-sub">Formato permitido: PDF (Máx. 15 MB)</p>
            <button type="button" className="btn btn-select-file">
              Buscar Archivo en mi Celular/PC
            </button>
          </div>
        ) : (
          <div className="upload-success-file">
            <FaCheckCircle className="file-success-icon" />
            <div className="file-meta">
              <span className="file-display-name">{archivo.name}</span>
              <span className="file-display-size">({(archivo.size / 1024 / 1024).toFixed(2)} MB)</span>
            </div>
            <button 
              type="button" 
              className="btn-remove-file-glass" 
              onClick={() => setArchivo(null)}
              title="Quitar archivo"
            >
              <FaTimes />
            </button>
          </div>
        )}
      </div>

      {error && <div className="error-message-glass">{error}</div>}
    </div>
  );
};

export default FileUpload;