// src/TrainingPlan.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Importa Link
import "../styles/stylesH-27.css";  // Actualización de la ruta al CSS

const TrainingPlan = ({ onGeneratePlan }) => {
  return (
    <div className="container">
      <div className="card">
        {/* Botón de cerrar como un Link */}
        <Link to="/" className="close-btn">X</Link>

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




