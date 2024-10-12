import "./VisualizarI.css";
import { useState, useEffect } from "react";
import Modal from "../Modal/VisualInfo/Modal";
import DetalleInforme from "../DetalleInforme/DetalleInforme";
import { Link } from "react-router-dom";

export default function VisualizarInforme() {
  const [showModalV, setShowModalV] = useState(false);
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Cargar informes al iniciar
  useEffect(() => {
    fetchReports();
  }, []);

  // Función para obtener informes
  const fetchReports = async (body = { action: "mostrarInformeYProductos" }) => {
    try {
      const response = await fetch(
        "https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/compras/hu-tp-62",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body), // Corregido "accion" a "action"
        }
      );
      const data = await response.json();
      if (Array.isArray(data.data)) {
        setReports(data.data);
      } else {
        console.error("Estructura de datos incorrecta", data);
        setReports([]);
      }
    } catch (error) {
      console.error("Error al obtener informes de compras:", error);
    }
  };

  // Función para manejar la búsqueda
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filtrar por día, mes o año
  const filterByDate = (unidadTemporal) => {
    fetchReports({
      action: "filtrarInformes", // Corregido "accion" por "action"
      unidadTemporal,
      ordenarPor: "fecha", // Ordenar por fecha
      orden: "asc", // Orden ascendente
    });
  };

  // Ordenar por máximo o mínimo gasto
  const ordenarPorGasto = (orden) => {
    fetchReports({
      action: "filtrarInformes", // Corregido "accion" por "action"
      ordenarPor: "gastoTotal", // Ordenar por gasto total
      orden, // Puede ser "asc" o "desc"
    });
  };

  // Filtrar informes por el término de búsqueda (nombre o fecha)
  const filteredReports = reports.filter((report) =>
    report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    new Date(report.assignment_date).toLocaleDateString().includes(searchTerm)
  );

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
      {showModalV && (
        <Modal onClose={handleCloseModalV}>
          <DetalleInforme report={selectedReport} />
        </Modal>
      )}
      <header>
        <div className="buttonHead">
          <Link to={"/"} className="back-buttonVI">
            - Regresar
          </Link>
          <Link to="/Informe-Compra/Registrar-Compra">
            <button className="add-buttonVI">+ Registrar Nueva Compra</button>
          </Link>
        </div>
        <div className="order-options">
          <span>Ordenar por </span>
          <button onClick={() => filterByDate("dia")}>Día</button>
          <button onClick={() => filterByDate("mes")}>Mes</button>
          <button onClick={() => filterByDate("ano")}>Año</button>
        </div>
        <div className="gasto-buttons">
          <button className="max-gasto" onClick={() => ordenarPorGasto("desc")}>
            Máximo gasto realizado
          </button>
          <button className="min-gasto" onClick={() => ordenarPorGasto("asc")}>
            Mínimo gasto realizado
          </button>
        </div>
      </header>

      <div className="informeCompraB">
        <h6>Informe Compra</h6>
        <input
          type="text"
          placeholder="Buscar Informe"
          value={searchTerm}
          onChange={handleSearch}
        />
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
            {filteredReports.length > 0 ? (
              filteredReports.map((report) => (
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
