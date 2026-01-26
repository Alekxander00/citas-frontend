import React from 'react';

const TIPOS_IDENTIFICACION = [
  { value: 'CEDULA_CIUDADANIA', label: 'Cédula de Ciudadanía' },
  { value: 'CEDULA_EXTRANJERIA', label: 'Cédula de Extranjería' },
  { value: 'CERTIFICADO_NACIDO_VIVO', label: 'Certificado de Nacido Vivo' },
  { value: 'PERMISO_ESPECIAL_PERMANENCIA', label: 'Permiso Especial de Permanencia' },
  { value: 'PERMISO_POR_PROTECCION_TEMPORAL', label: 'Permiso por Protección Temporal' },
  { value: 'REGISTRO_CIVIL', label: 'Registro Civil' },
  { value: 'TARJETA_IDENTIDAD', label: 'Tarjeta de Identidad' },
];

const SelectIdentificacion = ({ value, onChange, required }) => {
  return (
    <div className="form-group">
      <label htmlFor="tipo_identificacion">Tipo de Identificación {required && <span className="required">*</span>}</label>
      <select
        id="tipo_identificacion"
        name="tipo_identificacion"
        value={value}
        onChange={onChange}
        required={required}
        className="form-control"
      >
        <option value="">Seleccione un tipo</option>
        {TIPOS_IDENTIFICACION.map((tipo) => (
          <option key={tipo.value} value={tipo.value}>
            {tipo.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectIdentificacion;