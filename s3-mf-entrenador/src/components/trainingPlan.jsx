// src/TrainingPlan.jsx
import React from 'react';
import "../styles/stylesH-27.css";  // Actualización de la ruta al CSS

const TrainingPlan = ({ onGeneratePlan }) => {
  return (
    <div className="container">
      <div className="card">
        {/* Botón de cerrar */}
        <button className="close-btn">X</button>

        {/* Título principal */}
        <h2 className="title">Plan de Entrenamiento</h2>

        {/* Nombre del alumno */}
        <p className="student-name">Nombre del Alumno</p>

        {/* Mensaje principal */}
        <div className="message">
          No se encuentra plan de entrenamiento asignado
        </div>

        {/* Botón de acción */}
        <button className="action-btn" onClick={onGeneratePlan}>
          GENERAR PLAN DE ENTRENAMIENTO
        </button>
      </div>
    </div>
  );
};

export default TrainingPlan;




