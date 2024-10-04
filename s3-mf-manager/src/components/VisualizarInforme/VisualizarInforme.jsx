import "./VisualizarI.css";
import { useState, useEffect } from "react";
import Modal from "../Modal/VisualInfo/Modal";
import AgregarP from "../AgregarProducto/AgregarP";
import DetalleInforme from "../DetalleInforme/DetalleInforme";
import { Link } from "react-router-dom";

export default function VisualizarInforme() {
    const [showModal, setShowModal] = useState(false);
    const [showModalV, setShowModalV] = useState(false);
    const [reports, setReports] = useState([]);
    const [selectedReport, setSelectedReport] = useState(null);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await fetch('https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/compras/hu-tp-62', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        action: 'mostrarInformeYProductos',
                    }),
                });
                
                const data = await response.json();
                console.log("Respuesta de la API:", data); // Verificar la respuesta de la API
                
                if (Array.isArray(data.data)) { // Asegúrate de que accedes correctamente a los datos
                    setReports(data.data); // Ajusta según la estructura de tu API
                } else {
                    console.error("La estructura de datos es incorrecta", data);
                    setReports([]); // Si no es un array, asigna un array vacío
                }
            } catch (error) {
                console.error('Error al obtener informes de compras:', error);
            }
        };

        fetchReports();
    }, []);

    const handleAddEmployeeClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleOpenModalV = (report) => {
        setSelectedReport(report);
        setShowModalV(true);
    };

    const handleCloseModalV = () => {
        setShowModalV(false);
        setSelectedReport(null);
    };

    return (
        <div className="containerVI min-h-[90vh]">
            {showModal && (
                <Modal onClose={handleCloseModal}>
                    <AgregarP reportId={selectedReport ? selectedReport.report_id : null} />
                </Modal>
            )}
            {showModalV && (
                <Modal onClose={handleCloseModalV}>
                    <DetalleInforme report={selectedReport} />
                </Modal>
            )}
            <header>
                <div className="buttonHead">
                    <Link to={"/"} href="#" className="back-buttonVI">
                        - Regresar
                    </Link>
                    <Link to="/Informe-Compra/Registrar-Compra">
                    <button className="add-buttonVI" >
                        + Registrar Nueva Compra
                    </button>
                    </Link>

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
            <div className="informeCompraB">
                <h6>Informe Compra</h6>
                <input type="text" placeholder="" />
            </div>
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
                        {reports.length > 0 ? (
                            reports.map((report) => (
                                <tr key={report.report_id}>
                                    <td>{report.name}</td>
                                    <td>{new Date(report.assignment_date).toLocaleDateString()}</td>
                                    <td>{report.expense_incurred} soles</td>
                                    <td>
                                        <button className="view-button" onClick={() => handleOpenModalV(report)}>
                                            Visualizar
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">No hay informes disponibles.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
