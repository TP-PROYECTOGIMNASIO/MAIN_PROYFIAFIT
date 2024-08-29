import "./VisualizarI.css";
import { useState } from "react";
import Modal from "../Modal/Modal";
import AgregarP from "../AgregarProducto/AgregarP";
import DetalleInforme from "../DetalleInforme/DetalleInforme";

export default function VisualizarInforme() {
  const [showModal, setShowModal] = useState(false);
  const [showModalV, setShowModalV] = useState(false);

  const handleAddEmployeeClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenModalV = () => {
    setShowModalV(true);
  };

  const handleCloseModalV = () => {
    setShowModalV(false);
  };
  

  return (
    <div className="containerVI">
        {showModal && (
        <Modal onClose={handleCloseModal}>
          <AgregarP />
        </Modal>
      )}
      {showModalV && (
        <Modal onClose={handleCloseModalV}>
          <DetalleInforme />
        </Modal>
      )}
      <header>
        <div className="buttonHead">
          <a href="#" className="back-button">
            ◀ Regresar
          </a>
          <button className="add-button" onClick={handleAddEmployeeClick}>
            + Registrar Nueva Compra
          </button>
        </div>
        <div className="order-options">
          <span>Ordenar por </span>
          <button>Día</button>
          <button>Mes</button>
          <button>Año</button>
        </div>
        <div className="gasto-buttons">
          <button className="max-gasto">Máximo gasto realizado</button>
          <button className="min-gasto">Mínimo gasto realizado</button>
        </div>
      </header>
      
      <div className="cTabla">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Fecha de asignación</th>
              <th>Gasto realizado</th>
              <th>Ver Informe</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Informe xxxx</td>
              <td>10/08/2024</td>
              <td>250 soles</td>
              <td>
                <button className="view-button" onClick={handleOpenModalV}>Visualizar</button>
              </td>
            </tr>
            <tr>
              <td>Informe xxxx</td>
              <td>10/08/2024</td>
              <td>500 soles</td>
              <td>
                <button className="view-button">Visualizar</button>
              </td>
            </tr>
            <tr>
              <td>Informe xxxx</td>
              <td>10/08/2024</td>
              <td>600 soles</td>
              <td>
                <button className="view-button">Visualizar</button>
              </td>
            </tr>
            <tr>
              <td>Informe xxxx</td>
              <td>10/08/2024</td>
              <td>630 soles</td>
              <td>
                <button className="view-button">Visualizar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
