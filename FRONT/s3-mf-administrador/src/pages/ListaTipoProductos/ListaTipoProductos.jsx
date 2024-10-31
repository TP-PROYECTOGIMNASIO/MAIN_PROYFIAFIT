import React, { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';


const ListaTipoProductos = () => {
  const apiUrl84 = import.meta.env.VITE_APP_API_URL_84;

  const location = useLocation(); // Obtener la ubicación actual

  // Obtener los parámetros de búsqueda de la ubicación actual
  const params = new URLSearchParams(location.search);
  const role = params.get("role");
  const token = params.get("token");
  const username = params.get("username");
  console.log("role recibido en Lista de Tipo de Productos:", role);
  console.log("token recibido en Lista de Tipo de Productos:", token);
  console.log("username recibido en Lista de Tipo de Productos:", username);

  // Construir la URL con los parámetros
  const baseUrl = "/";
  const paramsString = `?role=${role}&token=${token}&username=${username}`;


  const [productTypes, setProductTypes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProductType, setCurrentProductType] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalMethod, setModalMethod] = useState('create');

  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [productTypeToDelete, setProductTypeToDelete] = useState(null);

  useEffect(() => {
    fetchProductTypes();
  }, []);

  const fetchProductTypes = async () => {
    try {
      const response = await fetch(apiUrl84, {
        method: 'POST', // Cambia a POST para incluir el cuerpo
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ method: 'read' }), // Envía el método aquí
      });
      const data = await response.json();
      if (response.ok) {
        setProductTypes(data.productTypes || []);
      } else {
        console.error('Error fetching product types:', data.message);
      }
    } catch (error) {
      console.error('Error fetching product types:', error);
    }
  };

  const openModal = (method, productType = null) => {
    setModalMethod(method);
    setCurrentProductType(productType);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentProductType(null);
  };

  const handleSave = async (productType) => {
    try {
      let response;
      const body = {
        ...productType,
      };

      if (modalMethod === 'create') {
        response = await fetch(apiUrl84, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            method: 'create', // Método para crear
            name: body.product_type_name,
            description: body.description,
          }),
        });
      } else if (modalMethod === 'update') {
        response = await fetch(apiUrl84, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            method: 'update', // Método para actualizar
            id: productType.product_type_id,
            name: body.product_type_name,
            description: body.description,
          }),
        });
      }

      const data = await response.json();
      if (response.ok) {
        fetchProductTypes(); // Refrescar la lista después de guardar
      } else {
        console.error('Error saving product type:', data.message);
      }
    } catch (error) {
      console.error('Error saving product type:', error);
    }
    closeModal();
  };

  const confirmDelete = (id) => {
    setProductTypeToDelete(productTypes.find((type) => type.product_type_id === id));
    setIsConfirmDeleteOpen(true);
  };
  
  const handleDeleteConfirmed = async (id) => {
    try {
      const response = await fetch(apiUrl84, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ method: 'delete', id: id }), // Enviar el ID a eliminar
      });
      const data = await response.json();
      if (response.ok) {
        fetchProductTypes(); // Refrescar la lista después de eliminar
      } else {
        console.error('Error deleting product type:', data.message);
      }
    } catch (error) {
      console.error('Error deleting product type:', error);
    }
  };
  

  // Filtrar los tipos de productos según el texto de búsqueda
   const filteredProductTypes = productTypes.filter(productType =>
    productType.product_type_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => window.history.back()}
              className="text-gray-500 hover:text-gray-700 flex items-center">
              <i className="fas fa-arrow-left mr-2"></i> Regresar
            </button>
        <h1 className="text-3xl font-bold text-red-700">TIPOS DE PRODUCTOS</h1>
        <button
          className="bg-red-700 text-white py-2 px-4 rounded hover:bg-red-800 flex items-center"
          onClick={() => openModal('create')}
        >
          <i className="fas fa-plus mr-2"></i> Registrar Nuevo Tipo producto
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex justify-end mb-4">
        <div className="relative w-1/5">
          <input
            type="text"
            placeholder="Buscar..."
            className="border border-gray-300 rounded py-2 px-16 pl-10"
            value={searchTerm} // Añadir el valor del estado de búsqueda
            onChange={(e) => setSearchTerm(e.target.value)} // Actualizar el estado de búsqueda
          />
          <div className="absolute left-3 top-2.5">
            <i className="fas fa-search text-gray-500"></i>
          </div>
        </div>
      </div>

      {/* Product Table */}
      <ProductTable productTypes={filteredProductTypes} openEditModal={openModal} confirmDelete={confirmDelete} />
        {/* Confirm Delete Modal */}
{isConfirmDeleteOpen && (
  <ConfirmDeleteModal
    onClose={() => setIsConfirmDeleteOpen(false)}
    onConfirm={handleDeleteConfirmed}
    productType={productTypeToDelete}
  />
)}

      {/* Product Modal */}
      {isModalOpen && (
        <ProductModal
          onClose={closeModal}
          onSave={handleSave}
          productType={currentProductType}
          method={modalMethod}
        />
      )}
    </div>
  );
};

// ProductTable Component
const ProductTable = ({ productTypes, openEditModal, confirmDelete }) => (
  <table className="min-w-full bg-white rounded shadow">
    <thead>
      <tr className="bg-gray-200">
        <th className="py-2 px-4">ID</th>
        <th className="py-2 px-4">Nombre</th>
        <th className="py-2 px-4">Descripción</th>
        <th className="py-2 px-4">Editar</th>
        <th className="py-2 px-4">Eliminar</th>
      </tr>
    </thead>
    <tbody>
      {productTypes.length > 0 ? (
        productTypes.map((productType) => (
          <tr key={productType.product_type_id} className="border-t">
            <td className="py-2 px-4">{productType.product_type_id}</td>
            <td className="py-2 px-4">{productType.product_type_name}</td>
            <td className="py-2 px-4">{productType.description}</td>
            <td className="py-2 px-4">
              <button
                className="text-blue-500 hover:text-blue-700 flex items-center"
                onClick={() => openEditModal('update', productType)}
              >
                <FontAwesomeIcon icon={faEdit} className="mr-2" /> 
              </button>
            </td>
            <td className="py-2 px-4">
              <button
                className="text-red-500 hover:text-red-700 flex items-center"
                onClick={() => confirmDelete(productType.product_type_id)}
              >
                <FontAwesomeIcon icon={faTrashAlt} className="mr-2" /> 
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="5" className="py-4 text-center text-gray-500">No hay tipos de productos disponibles</td>
        </tr>
      )}
    </tbody>
  </table>
);

// ProductModal Component
const ProductModal = ({ onClose, onSave, productType, method }) => {
  const [name, setName] = useState(productType ? productType.product_type_name : '');
  const [description, setDescription] = useState(productType ? productType.description : '');

  useEffect(() => {
    if (productType) {
      setName(productType.product_type_name);
      setDescription(productType.description);
    }
  }, [productType]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = { product_type_name: name, description };
    if (method === 'create') {
      onSave({ product_type_id: Math.random(), ...productData }); // ID aleatorio para el nuevo tipo de producto
    } else if (method === 'update') {
      onSave({ ...productData, product_type_id: productType.product_type_id });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <div className="flex justify-between items-center mb-4">
        <div className="text-center mx-auto">
        <h2 className="text-red-700 text-xl font-bold text-center">
            {method === 'create' ? (
                <>
                <div>REGISTRAR TIPO DE</div>
                <div>PRODUCTO</div>
                </>
            ) : (
                <>
                <div>EDITAR TIPO DE</div>
                <div>PRODUCTO</div>
                </>
            )}
            </h2>  
        </div>     
          <button onClick={onClose} className="text-gray-500">
            <i className="fas fa-times"></i>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-center">Nombre</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 rounded w-full py-2 px-3"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-center">Descripción</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-gray-300 rounded w-full py-2 px-3"
              required
            />
          </div>
          <div className="mb-4 flex justify-center">
          <button type="submit" className="bg-red-700 text-white py-2 px-4 rounded hover:bg-red-800">
            Guardar
          </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ConfirmDeleteModal Component
const ConfirmDeleteModal = ({ onClose, onConfirm, productType }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg p-6 w-96">
          <h2 className="text-red-700 text-xl font-bold mb-4 text-center">
            ¿Desea eliminar este tipo de producto?
          </h2>
          <div className="flex justify-around">
            <button
              onClick={() => {
                onConfirm(productType.product_type_id);
                onClose();
              }}
              className="bg-[#B5121C] text-white py-2 px-4 rounded hover:bg-red-800"
            >
              SI
            </button>
            <button
              onClick={onClose}
              className="bg-[#4B4F57] text-white py-2 px-4 rounded hover:bg-gray-600"
            >
              NO
            </button>
          </div>
        </div>
      </div>
    );
  };
  

export default ListaTipoProductos;

