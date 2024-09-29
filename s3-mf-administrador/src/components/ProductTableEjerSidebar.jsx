import React from 'react';
import styles from './ProductTableEjercicios.module.css'; // Asegúrate de crear este archivo CSS

const Sidebar = () => {
  return (
    <nav className="w-1/4 bg-gray-100 p-4">
      <h2 className="font-semibold text-gray-600 mb-4">SELECCIONAR</h2>
      <ul className="space-y-2">
        <li className={styles.textMuted}>CUADRICEPS</li>
        <li className={styles.textMuted}>GLÚTEOS</li>
        <li className={styles.textPrimary}>ESPALDA</li>
        <li className={styles.textMuted}>PECTORALES</li>
        <li className={styles.textMuted}>HOMBROS</li>
        <li className={styles.textMuted}>TRICEPS</li>
        <li className={styles.textMuted}>BICEPS</li>
      </ul>
    </nav>
  );
};

export default Sidebar;
