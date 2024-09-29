import React, { useEffect, useState } from 'react';

export default function DetalleInforme({ report }) {
  const [productos, setProductos] = useState([]);

  // Verifica si se ha seleccionado un informe
  useEffect(() => {
    if (report && report.productos && Array.isArray(report.productos)) {
      setProductos(report.productos);
      console.log("Productos recibidos:", report.productos);
    } else {
      console.log("No hay productos en el informe.");
    }
  }, [report]);

  // Verifica si se han recibido productos
  if (productos.length === 0) {
    return <div>No hay productos en este informe.</div>;
  }

  return (
    <div className="containerDetalleI">
      <h3 className="titleDI">Detalles del Informe {report.report_id}</h3>

      <table>
        <thead>
          <tr>
            <th>Nombre del Producto</th>
            <th>Fecha de Compra</th>
            <th>Precio Total</th>
            <th>Cantidad</th>
            <th>Recibo de Compra</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((product) => (
            <tr key={product.report_purchase_id}>
              <td>{product.product_name || 'No disponible'}</td>
              <td>{new Date(product.purchase_date).toLocaleDateString()}</td>
              <td>{product.total_price} soles</td>
              <td>{product.purchase_quantity}</td>
              <td>
                {product.purchase_receipt_url ? (
                  <a href={product.purchase_receipt_url} target="_blank" rel="noopener noreferrer">
                    <img src="/detalleInforme.png" alt="boleta" />
                  </a>
                ) : (
                  'Sin recibo'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />
      <div className="montoTotal">
        <p>MONTO TOTAL: S/. {report.expense_incurred || 'No disponible'}</p>
      </div>
    </div>
  );
}
