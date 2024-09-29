import React, { useState } from 'react';
import RegisterProductModal from './RegisterProductModal';
import EditProductModal from './EditProductModal';
import { Link } from 'react-router-dom';

const ProductTypes = () => {
  // Estado para almacenar productos
  const [products, setProducts] = useState([]);
  
  // Estado para abrir/cerrar el modal de registro
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  
  // Estado para abrir/cerrar el modal de edición
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  // Estado para almacenar el producto que se está editando
  const [currentProduct, setCurrentProduct] = useState(null);

  // Abrir modal de registro
  const openRegisterModal = () => setIsRegisterModalOpen(true);
  
  // Cerrar modal de registro
  const closeRegisterModal = () => setIsRegisterModalOpen(false);
  
  // Abrir modal de edición
  const openEditModal = (product) => {
    setCurrentProduct(product);
    setIsEditModalOpen(true);
  };
  
  // Cerrar modal de edición
  const closeEditModal = () => setIsEditModalOpen(false);

  // Función para agregar un nuevo producto
  const addProduct = (product) => {
    setProducts([...products, { id: products.length + 1, ...product }]);
    closeRegisterModal();
  };

  // Función para editar un producto
  const editProduct = (updatedProduct) => {
    setProducts(products.map(p => (p.id === updatedProduct.id ? updatedProduct : p)));
    closeEditModal();
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <Link to={"/"} className="text-gray-500 hover:text-gray-700 flex items-center">
          <i className="fas fa-arrow-left mr-2"></i>← Regresar
        </Link>
        <h1 className="text-3xl font-bold text-red-700">TIPOS DE PRODUCTOS</h1>
        <button
          className="bg-red-700 text-white py-2 px-4 rounded hover:bg-red-800 flex items-center"
          onClick={openRegisterModal}
        >
          <i className="fas fa-plus mr-2"></i> Registrar Nuevo Tipo producto
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex justify-end mb-4">
        <input
          type="text"
          placeholder="Buscar..."
          className="border border-gray-300 rounded py-2 px-4 w-1/3"
        />
      </div>

      {/* Table */}
      <table className="min-w-full border-collapse bg-white">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Nombre</th>
            <th className="px-4 py-2 text-left">Descripción</th>
            <th className="px-4 py-2 text-center">Editar</th>
            <th className="px-4 py-2 text-center">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-t">
              <td className="px-4 py-2">{product.id}</td>
              <td className="px-4 py-2">{product.name}</td>
              <td className="px-4 py-2">{product.description}</td>
              <td className="px-4 py-2 text-center">
                <button className="text-gray-500 hover:text-gray-700" onClick={() => openEditModal(product)}>
                  <i className="fas fa-edit"></i>
                </button>
              </td>
              <td className="px-4 py-2 text-center">
                <button className="text-gray-500 hover:text-gray-700" onClick={() => setProducts(products.filter(p => p.id !== product.id))}>
                  <i className="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal para registrar producto */}
      <RegisterProductModal isOpen={isRegisterModalOpen} onClose={closeRegisterModal} onSave={addProduct} />

      {/* Modal para editar producto */}
      {currentProduct && (
        <EditProductModal isOpen={isEditModalOpen} onClose={closeEditModal} product={currentProduct} onSave={editProduct} />
      )}
    </div>
  );
};

export default ProductTypes;