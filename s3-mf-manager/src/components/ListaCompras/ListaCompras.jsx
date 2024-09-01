import "./ListaC.css";
import { useState, useEffect } from "react";

export default function ListaC({ vista, setVista, productData, setProductData }) {
  const [reportId, setReportId] = useState(15);

  useEffect(() => {
    // Cualquier inicialización necesaria para productData se puede hacer aquí.
  }, [productData]);

  const resetVista = () => {
    setVista(false);
  };

  const handleEdit = (product) => {
    // Aquí debes crear una interfaz para editar los detalles del producto
    const updatedProduct = { ...product, name: "Producto Actualizado" }; // Modificar según sea necesario

    fetch('https://p48s3kepwc.execute-api.us-east-2.amazonaws.com/default/GENERAR_INFORME_COMPRA', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'updateProductInReport',
        report_product_id: product.report_product_id,
        image: updatedProduct.image,
        name: updatedProduct.name,
        purchaseDate: updatedProduct.purchaseDate,
        totalPrice: updatedProduct.totalPrice,
        product_type_id: updatedProduct.product_type_id,
        description: updatedProduct.description,
        quantity: updatedProduct.quantity,
        purchaseReceipt: updatedProduct.purchaseReceipt,
      }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Producto actualizado:', data);
      setProductData(productData.map(p => p.report_product_id === product.report_product_id ? updatedProduct : p));
    })
    .catch(error => console.error('Error al actualizar producto:', error));
  };

  const handleDelete = (product) => {
    fetch('https://p48s3kepwc.execute-api.us-east-2.amazonaws.com/default/GENERAR_INFORME_COMPRA', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'deleteProductFromReport',
        report_product_id: product.report_product_id,
      }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Producto eliminado:', data);
      setProductData(productData.filter(p => p.report_product_id !== product.report_product_id));
    })
    .catch(error => console.error('Error al eliminar producto:', error));
  };

  const handleSaveReport = () => {
    fetch('https://p48s3kepwc.execute-api.us-east-2.amazonaws.com/default/GENERAR_INFORME_COMPRA', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'finalizeReport',
        reportId: reportId,
      }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Informe finalizado:', data);
      alert('Informe finalizado exitosamente');
    })
    .catch(error => console.error('Error al finalizar informe:', error));
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
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productData.map((product, index) => (
            <tr key={product.report_product_id}>
              <td>{index + 1}</td>
              <td>{product.purchaseDate}</td>
              <td>{product.product_type_id}</td>
              <td>{product.name}</td>
              <td>{product.quantity}</td>
              <td>{product.totalPrice} soles</td>
              <td>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => handleEdit(product)}
                >
                  <img src="/vector-2.svg" alt="Editar" />
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(product)}
                >
                  <img src="/vector-3.svg" alt="Eliminar" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <div className="d-flex">
        <button className="btn btn-secondary" onClick={handleSaveReport}>
          Guardar Informe
        </button>
      </div>
    </div>
  );
}
