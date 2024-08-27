import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
                <a href="#" className="back-link">⟵ Regresar</a>
                <div className="title-container">
                    <h1 className="main-title">Registra las últimas actualizaciones</h1>
                    <h1 className="main-title-2">de los inventarios de tus sedes!</h1>
                </div>
                <div className="action-buttons">
                    <button className="button-class" onClick={handleRegisterNewInventory}>+ Registrar Nuevo Inventario</button>
                    <input type="text" placeholder="Buscar" className="input-class" />
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
                    <tr className="table-row">
                        <td className="cell-class"><input type="checkbox" /></td>
                        <td className="cell-class"><img src="https://placehold.co/50x50" alt="Mancuernas 3kg" /></td>
                        <td className="cell-class">Mancuernas 3kg</td>
                        <td className="cell-class">2</td>
                        <td className="cell-class">40 soles</td>
                    </tr>
                    <tr className="table-row">
                        <td className="cell-class"><input type="checkbox" /></td>
                        <td className="cell-class"><img src="https://placehold.co/50x50" alt="Mancuerna 20kg" /></td>
                        <td className="cell-class">Mancuerna 20kg</td>
                        <td className="cell-class">3</td>
                        <td className="cell-class">80 soles</td>
                    </tr>
                    <tr className="table-row">
                        <td className="cell-class"><input type="checkbox" /></td>
                        <td className="cell-class"><img src="https://placehold.co/50x50" alt="Pack gimnasio en casa" /></td>
                        <td className="cell-class">Pack gimnasio en casa</td>
                        <td className="cell-class">5</td>
                        <td className="cell-class">135 soles</td>
                    </tr>
                    <tr className="table-row">
                        <td className="cell-class"><input type="checkbox" /></td>
                        <td className="cell-class"><img src="https://placehold.co/50x50" alt="Rueda abdominal" /></td>
                        <td className="cell-class">Rueda abdominal</td>
                        <td className="cell-class">8</td>
                        <td className="cell-class">25 soles</td>
                    </tr>
                </tbody>
            </table>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <GenerarNuevoInventario />
            </Modal>
        </div>
    );
};

export default ActualizarInventarioSedes;
