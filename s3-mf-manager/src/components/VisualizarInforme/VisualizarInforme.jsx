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

  // Fetch all reports on component mount
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch(
          "https://p48s3kepwc.execute-api.us-east-2.amazonaws.com/default/VISUALIZAR_INFORME_COMPRAS",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ action: "showSalesReports" }),
          }
        );

        const result = await response.json();
        if (response.ok) {
          setReports(result.reports || []); // Ensure the response contains a list of reports
          console.log("Informes recuperados:", result.reports);
        } else {
          console.error("Error al mostrar informes:", result);
        }
      } catch (error) {
        console.error("Error en la llamada a la API:", error);
      }
    };

    fetchReports();
  }, []);

  const handleAddEmployeeClick = async () => {
    setShowModal(true);

    try {
      const response = await fetch(
        "https://p48s3kepwc.execute-api.us-east-2.amazonaws.com/default/GENERAR_INFORME_COMPRA",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ action: "createSalesReport" }),
        }
      );

      const result = await response.json();
      if (response.ok) {
        console.log("Informe de ventas creado:", result);
        const newReport = {
          report_id: result.reportId,
          created_at: new Date().toISOString(),
          importe_total: "0.00", // Or the corresponding initial value
          is_finalized: false
        };
        setReports([...reports, newReport]);
      } else {
        console.error("Error al crear informe de ventas:", result);
      }
    } catch (error) {
      console.error("Error en la llamada a la API:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenModalV = async (report) => {
    setSelectedReport(report);
    setShowModalV(true);

    // Fetch the products for the selected report
    try {
      const response = await fetch(
        "https://p48s3kepwc.execute-api.us-east-2.amazonaws.com/default/VISUALIZAR_INFORME_COMPRAS",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: "showProductsInReport",
            reportId: report.report_id, // Adjusted to match API attribute
          }),
        }
      );

      const result = await response.json();
      if (response.ok) {
        console.log("Productos del informe:", result.products);
        setSelectedReport({ ...report, products: result.products });
      } else {
        console.error("Error al obtener productos del informe:", result);
      }
    } catch (error) {
      console.error("Error en la llamada a la API:", error);
    }
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
          <button className="add-buttonVI" onClick={handleAddEmployeeClick}>
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
            {reports.map((report) => (
              <tr key={report.report_id}>
                <td>{`Informe ${report.report_id}`}</td>
                <td>{new Date(report.created_at).toLocaleDateString()}</td>
                <td>{report.importe_total} soles</td>
                <td>
                  <button className="view-button" onClick={() => handleOpenModalV(report)}>
                    Visualizar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
