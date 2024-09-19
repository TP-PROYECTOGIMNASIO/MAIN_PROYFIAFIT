// src/TrainingPlanSelection.jsx
import React from 'react';
import "../styles/stylesH-27.css";  // Actualización de la ruta al CSS

const TrainingPlanSelection = ({ onBack }) => {
  return (
    <div className="container">
      <div className="card">
        {/* Botón de regresar */}
        <button className="back-btn" onClick={onBack}>X</button>

        {/* Título principal */}
        <h2 className="title">Eligiendo Plan de Entrenamiento</h2>

        {/* Nombre del alumno */}
        <p className="student-name">Nombre del Alumno</p>

        {/* Texto de selección */}
        <div className="message">
          Seleccionar los días y rutinas
        </div>

        {/* Botones de días */}
        <div className="days-grid">
          <button className="day-btn">Día 1</button>
          <button className="day-btn">Día 2</button>
          <button className="day-btn">Día 3</button>
          <button className="day-btn">Día 4</button>
          <button className="day-btn">Día 5</button>
          <button className="day-btn">Día 6</button>
          <button className="day-btn">Día 7</button>
        </div>
      </div>
    </div>
  );
};

export default TrainingPlanSelection;
