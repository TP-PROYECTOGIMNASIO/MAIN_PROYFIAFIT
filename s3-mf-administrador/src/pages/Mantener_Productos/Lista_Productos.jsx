import React, { useEffect, useState } from 'react';

function Lista_Productos() {
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState({
    tipoProducto: '',
    nombre: '',
    descripcion: '',
    precio: '',
    imagen: null,
  });
  const [products, setProducts] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [selectedType, setSelectedType] = useState(''); // Nuevo estado para el tipo de producto seleccionado
  const [selectedStatus, setSelectedStatus] = useState('active'); // Estado para el estado del producto
  // Cargar productos y tipos de productos desde la API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/articulos/hu-tp-87');
        if (!response.ok) {
            throw new Error('Error en la respuesta de la API');
        }
        const data = await response.json();
        if (data && Array.isArray(data.products)) {
            setProducts(data.products);
        } else {
            console.error('Formato inesperado en la respuesta de la API:', data);
            setProducts([]);
        }
    } catch (error) {
        console.error('Error al obtener los productos:', error);
    }
    };

    const fetchProductTypes = async () => {
      try {
        const response = await fetch('https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/articulos/hu-tp-87?get_product_types=true');
        if (!response.ok) {
            throw new Error('Error en la respuesta de la API');
        }
        const data = await response.json();
        if (data && Array.isArray(data.products)) {
          setProductTypes(data.products);
        } else {
            console.error('Formato inesperado en la respuesta de la API:', data);
            setProductTypes([]);
        }
    } catch (error) {
        console.error('Error al obtener los tipos de productos:', error);
    }
    };

    fetchProducts();
    fetchProductTypes();
  }, []);

  // Manejar cambio en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Filtrar productos por tipo y estado seleccionado
  const filteredProducts = products.filter(product => {
    const typeMatch = selectedType ? product.product_type_id === parseInt(selectedType) : true;
    const statusMatch = selectedStatus === 'active' ? product.active : !product.active;
    return typeMatch && statusMatch;
  });

  // Manejar el cambio en el tipo de producto seleccionado
  const handleTypeChange = (e) => {
    setSelectedType(e.target.value); // Actualiza el tipo de producto seleccionado
  };

   // Manejar el cambio en el estado del producto
   const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  // Validación del precio (no negativo, no cero)
  const isPriceValid = (price) => {
    const parsedPrice = parseFloat(price);
    return !isNaN(parsedPrice) && parsedPrice > 0;
  };

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar que todos los campos estén completos
    if (!formData.tipoProducto || !formData.nombre || !formData.descripcion || !formData.precio || !formData.imagen) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    // Validar el campo de precio
    if (!isPriceValid(formData.precio)) {
      alert('Por favor, ingrese un precio válido en Soles (S/.), mayor a 0.');
      return;
    }

    // Crear un nuevo producto
    const newProduct = {
      id: products.length + 1,
      name: formData.nombre,
      imageUrl: URL.createObjectURL(formData.imagen), // Crear URL de la imagen
      descripcion: formData.descripcion,
      precio: `S/. ${parseFloat(formData.precio).toFixed(2)}`, // Formato S/. xxx.xx
      product_type_id: parseInt(formData.tipoProducto) // Añadir el ID del tipo de producto
    };

    // Agregar el nuevo producto a la lista
    setProducts((prevProducts) => [...prevProducts, newProduct]);

    // Limpiar los campos del formulario después de la inscripción
    setFormData({
      tipoProducto: '',
      nombre: '',
      descripcion: '',
      precio: '',
      imagen: null,
    });

    // Mostrar ventana de éxito y cerrar el formulario
    setShowModal(false);
    setShowSuccessModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex flex-1">
        <aside className="w-64 bg-white shadow-md">
          <div className="p-4">
            {/* Botón Regresar */}
            <button
              onClick={() => window.history.back()}
              className="text-gray-500 hover:text-gray-700 flex items-center">
              <i className="fas fa-arrow-left mr-2"></i> Regresar
            </button>
   
        <br></br>
        <br></br>
        <br></br>
            <select className="px-3 py-2 bg-red-700 text-white rounded-lg" value={selectedType} onChange={handleTypeChange}>
                <option value="">Seleccionar Tipo de Producto</option>
                {productTypes.map((type) => (
                  <option key={type.product_type_id} value={type.product_type_id}>{type.product_type_name}</option>
                ))}
              </select>
          </div>
        </aside>

        <main className="flex-1 p-6 bg-gray-50">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-red-700">LISTA DE PRODUCTOS</h1>
            <div className="flex flex-col space-y-4">
              <button onClick={() => setShowModal(true)} className="flex items-center px-4 py-2 text-white bg-red-700 rounded-lg">
                <span className="mr-2 text-lg">+</span> Registrar Nuevo Producto
              </button>
              <select className="px-3 py-2 bg-red-700 text-white rounded-lg" value={selectedStatus} onChange={handleStatusChange}>
                <option value="active">Activos</option>
                <option value="inactive">Inactivos</option>
              </select>
            </div>
          </div>

          {/* Product List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {filteredProducts.map((product) => (
              <div key={product.product_id} className="p-6 bg-white rounded-lg shadow-md">
                <img src={product.image_url} alt={product.product_name} className="w-full h-40 object-cover mb-4" />
                <h3 className="text-lg font-semibold text-gray-800">{product.product_name}</h3>
                <p className="text-gray-600">{product.description}</p>
                <p className="text-gray-800 font-bold">{`S/. ${product.price}`}</p>
                <button className="w-full py-2 mt-4 text-white bg-red-700 rounded-lg">
                  DESHABILITAR
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Modal para Registro de Producto */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-8 shadow-lg w-96 relative">
            <button onClick={() => setShowModal(false)} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
              X
            </button>
            <h2 className="text-2xl text-red-700 font-bold text-center mb-6">REGISTRAR PRODUCTO</h2>
            <form className="space-y-4 text-center" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-700">Tipo de Producto:</label>
                <select name="tipoProducto" className="w-full p-2 border border-gray-300 rounded-lg" value={formData.tipoProducto} onChange={handleChange}>
                  <option value="" disabled>Seleccionar</option>
                  {productTypes.map((type) => (
                    <option key={type.product_type_id} value={type.product_type_id}>{type.product_type_name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700">Nombre:</label>
                <input type="text" name="nombre" className="w-full p-2 border border-gray-300 rounded-lg" value={formData.nombre} onChange={handleChange} />
              </div>
              <div>
                <label className="block text-gray-700">Descripción:</label>
                <input type="text" name="descripcion" className="w-full p-2 border border-gray-300 rounded-lg" value={formData.descripcion} onChange={handleChange} />
              </div>
              <div>
                <label className="block text-gray-700">Precio:</label>
                <input type="number" name="precio" className="w-full p-2 border border-gray-300 rounded-lg" value={formData.precio} onChange={handleChange} />
              </div>
              <div>
                <label className="block text-gray-700">Imagen:</label>
                <input type="file" name="imagen" className="w-full p-2 border border-gray-300 rounded-lg" onChange={(e) => setFormData({...formData, imagen: e.target.files[0]})} />
              </div>
              <button type="submit" className="w-full py-2 text-white bg-red-700 rounded-lg">Registrar</button>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Éxito */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-8 shadow-lg w-96">
            <h2 className="text-2xl text-red-700 font-bold text-center mb-4">¡Éxito!</h2>
            <p className="text-center">El producto ha sido registrado exitosamente.</p>
            <button onClick={() => setShowSuccessModal(false)} className="mt-4 w-full py-2 text-white bg-red-700 rounded-lg">Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Lista_Productos;
