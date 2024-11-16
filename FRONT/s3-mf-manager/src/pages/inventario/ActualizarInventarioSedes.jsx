import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles/ActualizarInventarioSedes.css';
import Modal from './Modal';
import GenerarNuevoInventario from './GenerarNuevoInventario'; // Asegúrate de que la ruta sea correcta

const ActualizarInventarioSedes = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleRegisterNewInventory = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="inventory-container">
            <div className="header-container">
                <Link to={"/"} className="back-link">⟵ Regresar</Link>
                <div className="titles-container">
                    <h1 className="main-title">Registra las últimas actualizaciones</h1>
                    <h1 className="main-title">de los inventarios de tus sedes!</h1>
                </div>
                <button className="button-class" onClick={handleRegisterNewInventory}>+ Registrar Nuevo Inventario</button>
            </div>
            <div className="subheader-container">
                <div className="search-bar">
                    <label htmlFor="search-input" className="search-label">Buscar:</label>
                    <input id="search-input" type="text" placeholder=" " className="input-class" />
                </div>
            </div>
            <table className="inventory-table">
                <thead>
                    <tr className="table-header">
                        <th className="cell-class">Asignar</th>
                        <th className="cell-class">Imagen del producto</th>
                        <th className="cell-class">Nombre</th>
                        <th className="cell-class">Cantidad</th>
                        <th className="cell-class">Precio de Compra</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Aquí va el contenido de la tabla */}
                </tbody>
            </table>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <GenerarNuevoInventario />
            </Modal>
        </div>
    );
};

export default ActualizarInventarioSedes;
