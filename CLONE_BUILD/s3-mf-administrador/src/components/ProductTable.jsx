// src/components/ProductTable.jsx
import React from 'react';

const ProductTable = () => {
  return (
    <table className="product-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Editar</th>
          <th>Eliminar</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Ejemplo Producto</td>
          <td>Descripción del producto</td>
          <td><button className="edit-button">✏️</button></td>
          <td><button className="delete-button">🗑️</button></td>
        </tr>
        {/* Aquí puedes agregar más filas dinámicamente */}
      </tbody>
    </table>
  );
};

export default ProductTable;