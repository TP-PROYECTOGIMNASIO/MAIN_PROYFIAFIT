import React from 'react';

export default function DetalleInforme({ report }) {
  // Verifica si se ha seleccionado un informe y si contiene productos
  if (!report) {
    return <div>No se ha seleccionado ningún informe.</div>;
  }

  const { products } = report; // Extrae los productos del informe

  return (
    <div className="containerDetalleI">
      <h3 className="titleDI">Detalles del Informe {report.report_id}</h3>
          
            
      {products && products.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Fecha de Compra</th>
              <th>Precio Total</th>
              <th>Descripción</th>
              <th>Cantidad</th>
              <th>Recibo de Compra</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.report_product_id}>
                <td>{product.name}</td>
                <td>{new Date(product.purchase_date).toLocaleDateString()}</td>
                <td>{product.total_price} soles</td>
                <td>{product.description}</td>
                <td>{product.quantity}</td>
                <td>
                  <a href={product.purchase_receipt ? `data:image/jpeg;base64,${btoa(
                    String.fromCharCode(...new Uint8Array(product.purchase_receipt.data))
                  )}` : '#'} target="_blank" rel="noopener noreferrer">
                    <img src="/detalleInforme.png" alt="boleta" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
      ) : (
        <p>No hay productos en este informe.</p>
      )}
      <br></br>
        <div className='montoTotal'>
          <p>MONTO TOTAL: S/. {report.importe_total}</p>
        </div>
    </div>
  );
}
