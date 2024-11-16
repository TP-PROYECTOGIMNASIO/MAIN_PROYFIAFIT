import "./ListaC.css";
import { useState, useEffect } from "react";

export default function ListaC({ vista, setVista, productData, setProductData }) {
  const [reportId, setReportId] = useState(15);

  useEffect(() => {
    // Llamar a la API para obtener los productos temporalmente almacenados
    fetch('https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/compras/hu-tp-61', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'fetchProductsByReport',
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.products && Array.isArray(data.products)) {
          setProductData(data.products); // Actualiza la lista de productos
        } else {
          console.log("No hay productos temporales.");
          setProductData([]); // Si no hay productos, limpiar la lista
        }
      })
      .catch((error) => console.error('Error al obtener productos temporales:', error));
  }, [setProductData]);

  const resetVista = () => {
    setVista(false);
  };

  const handleSaveProducts = () => {
    fetch('https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/compras/hu-tp-61', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'guardarInforme',
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        alert(result.message); // Mostrar mensaje de confirmación
      })
      .catch((error) => console.error('Error al guardar productos:', error));
  };

  return (
    <div className="containerListaC">
      <h3 className="title">Lista de Compras</h3>
      <div className="d-flex justify-content-end">
        <button className="btn btn-secondary" onClick={resetVista}>
          + Agregar Nuevo Producto
        </button>
      </div>
      <br />
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Fecha</th>
            <th>Tipo Producto</th>
            <th>Nombre Producto</th>
            <th>Cantidad</th>
            <th>Precio Venta</th>
          </tr>
        </thead>
        <tbody>
          {productData.length > 0 ? (
            productData.map((product, index) => (
              <tr key={product.report_product_id}>
                <td>{index + 1}</td>
                <td>{product.purchase_date}</td> {/* Verifica que esta propiedad exista */}
                <td>{product.product_type_id}</td> {/* Verifica que esta propiedad exista */}
                <td>{product.name}</td> {/* Verifica que esta propiedad exista */}
                <td>{product.purchase_quantity}</td> {/* Verifica que esta propiedad exista */}
                <td>{product.total_price} soles</td> {/* Verifica que esta propiedad exista */}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">No hay productos registrados.</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="d-flex justify-content-end">
        <button className="btn btn-primary" onClick={handleSaveProducts}>
          Guardar Productos
        </button>
      </div>
    </div>
  );
}