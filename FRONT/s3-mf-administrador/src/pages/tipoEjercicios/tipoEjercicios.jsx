import React from "react";
import { Link } from "react-router-dom";
import styles from "./tipoEjercicios.module.css";
import logo from '../../assets/Logo.png';


import Sidebar from "../../components/ProductTableEjerList";
import ExerciseList from "../../components/ProductTableEjerSidebar";

export default function TipoEjercicios() {
  return (
    <div className={`app-container ${styles.appContainer}`}>

      <div className={`${styles.mainContent} main-content flex`}>
        <div className={styles.sidebar}>
          <ExerciseList />
        </div>

        <div className="flex-1">
          <h1 className="page-title">TIPOS DE EJERCICIOS</h1>
          <div className="top-buttons">
            <Link to={"/"} className="back-link">← Regresar</Link>
            <Link to="/add-ejercicio" className="register-button">+ Registrar Nuevo Ejercicio</Link>
          </div>
          <Sidebar />
        </div>
      </div>

    </div>
  );
}
