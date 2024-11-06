import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Lista_Productos() {
  const apiUrl87 = import.meta.env.VITE_APP_API_URL_87;

  const location = useLocation(); // Obtener la ubicación actual

  // Obtener los parámetros de búsqueda de la ubicación actual
  const params = new URLSearchParams(location.search);
  const role = params.get("role");
  const token = params.get("token");
  const username = params.get("username");
  console.log("role recibido en Lista de Productos:", role);
  console.log("token recibido en Lista  de Productos:", token);
  console.log("username recibido en Lista de Productos:", username);

  // Construir la URL con los parámetros
  const baseUrl = "/";
  const paramsString = `?role=${role}&token=${token}&username=${username}`;

  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false); // Nuevo modal para confirmación

  const [formData, setFormData] = useState({
    tipoProducto: "",
    nombre: "",
    descripcion: "",
    precio: "",
    imagen: null,
  });
  const [products, setProducts] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [selectedType, setSelectedType] = useState(""); // Nuevo estado para el tipo de producto seleccionado
  const [selectedStatus, setSelectedStatus] = useState("active"); // Estado para el estado del producto
  const [currentProduct, setCurrentProduct] = useState(null); // Producto seleccionado para confirmación
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Cargar productos y tipos de productos desde la API
  useEffect(() => {
    fetchProducts();
    fetchProductTypes();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(apiUrl87);
      if (!response.ok) {
        throw new Error("Error en la respuesta de la API");
      }
      const data = await response.json();
      if (data && Array.isArray(data.products)) {
        //setProducts(data.products);
        setProducts(data.products || []);
      } else {
        console.error("Formato inesperado en la respuesta de la API:", data);
        setProducts([]);
      }
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    }
  };

  const fetchProductTypes = async () => {
    try {
      const response = await fetch(`${apiUrl87}?get_product_types=true`);
      if (!response.ok) {
        throw new Error("Error en la respuesta de la API");
      }
      const data = await response.json();
      if (data && Array.isArray(data.products)) {
        setProductTypes(data.products);
      } else {
        console.error("Formato inesperado en la respuesta de la API:", data);
        setProductTypes([]);
      }
    } catch (error) {
      console.error("Error al obtener los tipos de productos:", error);
    }
  };

  // Manejar cambio en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Filtrar productos por tipo y estado seleccionado
  const filteredProducts = products.filter((product) => {
    // Verifica si product es válido y tiene las propiedades necesarias
    if (!product || typeof product.product_name === "undefined") {
      return false; // Excluir productos inválidos
    }

    const typeMatch = selectedType
      ? product.product_type_id === parseInt(selectedType)
      : true;
    const statusMatch =
      selectedStatus === "active" ? product.active : !product.active;

    // Asegúrate de que product_name esté definido antes de llamar a toLowerCase
    const nameMatch =
      product.product_name &&
      product.product_name.toLowerCase().includes(searchTerm.toLowerCase());

    return typeMatch && statusMatch && nameMatch;
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Comenzar a cargar

    // Validar que todos los campos estén completos
    if (
      !formData.tipoProducto ||
      !formData.nombre ||
      !formData.descripcion ||
      !formData.precio ||
      !formData.imagen
    ) {
      alert("Por favor, complete todos los campos.");
      setIsLoading(false); // Restablecer a falso
      return;
    }

    // Validar el campo de precio
    if (!isPriceValid(formData.precio)) {
      alert("Por favor, ingrese un precio válido en Soles (S/.), mayor a 0.");
      setIsLoading(false); // Restablecer a falso
      return;
    }

    // Validar que la imagen esté presente
    if (!formData.imagen) {
      alert("Por favor, suba una imagen del producto.");
      setIsLoading(false); // Restablecer a falso
      return;
    }

    // Crear FormData para enviar con archivo
    const formDataToSend = new FormData();
    formDataToSend.append("product_type_id", formData.tipoProducto);
    formDataToSend.append("product_name", formData.nombre);
    formDataToSend.append("description", formData.descripcion);
    formDataToSend.append("price", formData.precio);
    formDataToSend.append("file", formData.imagen); // Agregar archivo de imagen

    try {
      // Enviar solicitud POST a la API
      const response = await fetch(apiUrl87, {
        method: "POST",
        body: formDataToSend, // Enviar FormData
      });

      if (!response.ok) {
        // Si la respuesta no es exitosa, lanza un error con detalles adicionales
        const errorMessage = await response.text(); // o response.json() dependiendo del formato de error
        throw new Error(`Error al registrar el producto: ${errorMessage}`);
      }

      const newProduct = await response.json();

      // Actualizar la lista de productos con el nuevo producto
      setProducts((prevProducts) => [...prevProducts, newProduct]);

      // Limpiar los campos del formulario después de la inscripción
      setFormData({
        tipoProducto: "",
        nombre: "",
        descripcion: "",
        precio: "",
        imagen: null,
      });

      // Mostrar ventana de éxito y cerrar el formulario
      setShowModal(false);
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error al enviar los datos del producto:", error);
      // Mostrar alert y cerrar el modal al hacer clic en OK
      alert(
        `Ocurrió un error al registrar el producto. Por favor, inténtelo de nuevo más tarde. ${error.message}`
      );
      setShowModal(false); // Cerrar el formulario en caso de error
    } finally {
      setIsLoading(false); // Restablecer a falso
    }
  };

  // Manejar cambio de estado del producto
  const toggleProductStatus = async (product_id, currentStatus) => {
    const newStatus = !currentProduct.active; // Invertir el estado actual

    try {
      const response = await fetch(apiUrl87, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_id: currentProduct.product_id,
          active: newStatus, // Enviar el nuevo estado
        }),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar el estado del producto");
      }

      // Actualizar el estado del producto en la lista
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.product_id === currentProduct.product_id
            ? { ...product, active: newStatus }
            : product
        )
      );

      setShowConfirmModal(false); // Cerrar modal de confirmación
    } catch (error) {
      console.error("Error al actualizar el estado del producto:", error);
    }
  };

  // Abrir modal de confirmación
  const openConfirmModal = (product) => {
    setCurrentProduct(product); // Guardar el producto seleccionado
    setShowConfirmModal(true); // Mostrar modal de confirmación
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex flex-1">
        <aside className="w-64 bg-white shadow-md">
          <div className="p-4">
            {/* Botón Regresar */}
            <button
              onClick={() => window.history.back()}
              className="text-gray-500 hover:text-gray-700 flex items-center"
            >
              <i className="fas fa-arrow-left mr-2"></i> Regresar
            </button>

            <br></br>
            <br></br>
            <br></br>
            <div className="lg:col-span-1 bg-gray-100 p-4 rounded-lg">
              <h2 className="text-xl font-bold mb-4">SELECCIONAR</h2>

              <ul className="space-y-2">
                {/* Opción para seleccionar todas */}
                <li>
                  <button
                    onClick={() => setSelectedType(null)} // null indica que se seleccionan todas
                    className={`block w-full text-left p-2 rounded-lg ${
                      selectedType === null
                        ? "bg-red-600 text-white"
                        : "bg-white text-gray-700"
                    }`}
                  >
                    TODAS
                  </button>
                </li>
                {productTypes.map((type) => (
                  <li key={type.product_type_id}>
                    <button
                      onClick={() => setSelectedType(type.product_type_id)} // Cambia el estado al tipo seleccionado
                      className={`block w-full text-left p-2 rounded-lg ${
                        selectedType === type.product_type_id
                          ? "bg-red-600 text-white"
                          : "bg-white text-gray-700"
                      }`}
                    >
                      {type.product_type_name}
                    </button>
                  </li>
                ))}
              </ul>

              {/* Filtro por Nombre */}
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Buscar por nombre"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1 p-6 bg-gray-50">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-red-700 text-center flex-grow">
              LISTA DE PRODUCTOS
            </h1>
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center px-4 py-2 text-white bg-red-700 rounded-lg"
              >
                <span className="mr-2 text-lg">+</span> Registrar Nuevo Producto
              </button>
              <select
                className="px-3 py-2 bg-red-700 text-white rounded-lg"
                value={selectedStatus}
                onChange={handleStatusChange}
              >
                <option value="active">Activos</option>
                <option value="inactive">Inactivos</option>
              </select>
            </div>
          </div>

          {/* Lista de productos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {filteredProducts.map((product) => (
              <div
                key={product.product_id}
                className="p-6 bg-white rounded-lg shadow-md"
              >
                <img
              src={product.image_url}
              alt={product.product_name}
              className="w-full h-40 object-cover mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-800">
                  {product.product_name}
                </h3>
                <p className="text-gray-600">{product.description}</p>
                <p className="text-gray-800 font-bold">{`S/. ${product.price}`}</p>
                <button
                  onClick={() => openConfirmModal(product)} // Abrir modal de confirmación
                  className={`mt-4 px-4 py-2 text-white rounded-lg ${
                    product.active ? "bg-red-700" : "bg-gray-400"
                  }`}
                >
                  {product.active ? "DESHABILITAR" : "HABILITAR"}
                </button>
              </div>
            ))}
          </div>

        </main>
      </div>

      {/* Modal de confirmación */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg">
            <h2 className="text-xl font-bold text-gray-700 mb-4 text-center">
              Confirmación
            </h2>
            <p
              className="mb-4 break-words text-lg"
              style={{ color: "#8C1C13" }}
            >
              ¿Seguro que desea{" "}
              {currentProduct.active ? "deshabilitar" : "habilitar"} el producto
              seleccionado "{currentProduct.product_name}"?
            </p>
            <div className="flex justify-center space-x-4 mt-4">
              {" "}
              {/* Cambié justify-end por justify-center */}
              <button
                onClick={toggleProductStatus}
                className="px-4 py-2 text-white rounded-lg"
                style={{ backgroundColor: "#B60707" }}
              >
                Sí
              </button>
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 text-white rounded-lg"
                style={{ backgroundColor: "#4B4F57" }}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para Registro de Producto */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-8 shadow-lg w-96 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              X
            </button>
            <h2 className="text-2xl text-red-700 font-bold text-center mb-6">
              REGISTRAR PRODUCTO
            </h2>
            <form className="space-y-4 text-center" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-700">Tipo de Producto:</label>
                <select
                  name="tipoProducto"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  value={formData.tipoProducto}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Seleccionar
                  </option>
                  {productTypes.map((type) => (
                    <option
                      key={type.product_type_id}
                      value={type.product_type_id}
                    >
                      {type.product_type_name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700">Nombre:</label>
                <input
                  type="text"
                  name="nombre"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  value={formData.nombre}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-gray-700">Descripción:</label>
                <input
                  type="text"
                  name="descripcion"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  value={formData.descripcion}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-gray-700">Precio:</label>
                <input
                  type="number"
                  name="precio"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  value={formData.precio}
                  onChange={handleChange}
                  min="0"  // No permite números negativos
                />
              </div>
              <div>
                <label className="block text-gray-700">Subir Imagen:</label>
                <input
                  type="file"
                  name="imagen"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  onChange={(e) =>
                    setFormData({ ...formData, imagen: e.target.files[0] })
                  }
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 text-white bg-red-700 rounded-lg"
              >
                Guardar
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Éxito */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-8 shadow-lg w-96">
            <h2 className="text-2xl text-red-700 font-bold text-center mb-4">
              ¡Éxito!
            </h2>
            <p className="text-center">PRODUCTO AGREGADO CON ÉXITO</p>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="mt-4 w-full py-2 text-white bg-red-700 rounded-lg"
            >
              Volver
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Lista_Productos;
