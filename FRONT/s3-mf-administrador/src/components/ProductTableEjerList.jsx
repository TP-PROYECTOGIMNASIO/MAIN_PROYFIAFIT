import React from 'react';
import styles from './ProductTableEjercicios.module.css'; // Asegúrate de crear este archivo CSS

const ExerciseItem = ({ name }) => {
  return (
    <div className={`${styles.borderMuted} p-4 rounded-lg text-center`}>
      <h3 className="font-semibold">{name}</h3>
      <button className={`${styles.destructiveButton} ${styles.button} mt-2`}>ELIMINAR</button>
    </div>
  );
};

const ExerciseList = () => {
  return (
    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <ExerciseItem name="REMO EN MAQUINA" />
      <ExerciseItem name="PULL-UPS" />
      <ExerciseItem name="FACE-PULLS" />
    </div>
  );
};

export default ExerciseList;
