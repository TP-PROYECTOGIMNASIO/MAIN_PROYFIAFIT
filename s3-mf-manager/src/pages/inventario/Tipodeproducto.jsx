import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Tipodeproducto.css';

const Tipodeproducto = () => {
  const navigate = useNavigate();

  return (
    <div className="product-selection-container h-[100vh]">
      <a href="#" className="back-link">← Regresar</a>
      <h2 className="main-title">Primero debes seleccionar un Tipo de Producto</h2>
      <div className="product-grid">
        <div className="product-card">
          <h3 className="product-title">Accesorios Deportivos</h3>
          <a href="#" className="product-button">Ingresar</a>
        </div>
        <div className="product-card">
          <h3 className="product-title">Suplementos</h3>
          <a href="#" className="product-button">Ingresar</a>
        </div>
        <div className="product-card">
          <h3 className="product-title">Maquina</h3>
          <a href="#" className="product-button">Ingresar</a>
        </div>
        <div className="product-card">
          <h3 className="product-title">Equipo de Ejercicios</h3>
          <a
            href="#"
            className="product-button"
            onClick={() => navigate('/ActualizarInventarioSedes')}
          >
            Ingresar
          </a>
        </div>
        <div className="product-card">
          <h3 className="product-title">Ropa Deportiva</h3>
          <a href="#" className="product-button">Ingresar</a>
        </div>
      </div>
    </div>
  );
};

export default Tipodeproducto;