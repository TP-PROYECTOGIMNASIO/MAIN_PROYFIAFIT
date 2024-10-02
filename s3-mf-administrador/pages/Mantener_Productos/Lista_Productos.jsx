import { useState, useEffect } from 'react';

function Lista_Productos() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [showNewProductForm, setShowNewProductForm] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [productToDisable, setProductToDisable] = useState(null);
  const [activeFilter, setActiveFilter] = useState('Activos'); // Estado del combobox
  const [showInactiveProducts, setShowInactiveProducts] = useState(false); // Estado modal de los productos inactivos

  useEffect(() => {
    fetch('https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/articulos/hu-tp-87')
      .then(response => response.json())
      .then(data => {
        setProducts(data.products.map(product => ({
          id: product.product_id,
          name: product.product_name,
          image: product.image_url,
          category: '', // No hay categoría en la respuesta API, por lo que la dejamos vacía.
          description: product.description,
          price: product.price,
          active: product.active,
        })));
      })
      .catch(error => console.error(error));
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleProductActivation = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? { ...product, active: !product.active }
          : product
      )
    );
  };

  const handleNewProduct = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
    setShowNewProductForm(false);
    setShowSuccessMessage(true);
  };

  const handleDisableConfirmation = (product) => {
    setProductToDisable(product);
    setShowConfirmationModal(true);
  };

  const handleConfirmDisable = () => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productToDisable.id
          ? { ...product, active: false }
          : product
      )
    );
    setShowConfirmationModal(false);
  };

  const handleCancelDisable = () => {
    setShowConfirmationModal(false);
  };

  const handleActiveFilterChange = (filter) => {
    setActiveFilter(filter);
    setShowInactiveProducts(filter === 'Inactivos');
  };

  const filteredProducts = products.filter((product) => {
    if (selectedCategory === 'Todas') {
      return true;
    } else {
      return product.category === selectedCategory;
    }
  }).filter((product) => {
    if (activeFilter === 'Activos') {
      return product.active;
    } else {
      return !product.active;
    }
  });

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8 xl:p-10">
      <div className="flex justify-between items-center mb-4 md:mb-6 lg:mb-8 xl:mb-10">
        <div className="flex items-center">
          <h2 className="text-xl font-bold text-center md:text-2xl lg:text-3xl xl:text-4xl">Lista de Productos</h2>
        </div>
        <div className="flex items-center justify-end">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded md:py-3 md:px-6 lg:py-4 lg:px-8 xl:py-5 xl:px-10"
            onClick={() => setShowNewProductForm(true)}
          >
            + Registrar Nuevo Producto
          </button>
          <select
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded ml-2 md:py-3 md:px-6 lg:py-4 lg:px-8 xl:py-5 xl:px-10"
            value={activeFilter}
            onChange={(e) => handleActiveFilterChange(e.target.value)}
          >
            <option value="Activos">Activos</option>
            <option value="Inactivos">Inactivos</option>
          </select>
        </div>
      </div>

      {showNewProductForm && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg md:p-8 lg:p-10 xl:p-12 ">
            <NewProductForm onSubmit={handleNewProduct} />
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded md:py-3 md:px-6 lg:py-4 lg:px-8 xl:py-5 xl:px-10"
              onClick={() => setShowNewProductForm(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {showSuccessMessage && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg md:p-8 lg:p-10 xl:p-12">
            <p className="text-green-500 font-bold text-lg md:text-xl lg:text-2xl xl:text-3xl">
              PRODUCTO AGREGADO CON EXITO
            </p>
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded md:py-3 md:px-6 lg:py-4 lg:px-8 xl:py-5 xl:px-10"
              onClick={() => setShowSuccessMessage(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {showConfirmationModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg md:p-8 lg:p-10 xl:p-12">
            <p className="text-gray-700 font-bold text-lg md:text-xl lg:text-2xl xl:text-3xl mb-4">
              ¿Seguro que desea deshabilitar el producto '{productToDisable.name}'?
            </p>
            <div className="flex justify-end">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2 md:py-3 md:px-6 lg:py-4 lg:px-8 xl:py-5 xl:px-10"
                onClick={handleConfirmDisable}
              >
                Sí
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded md:py-3 md:px-6 lg:py-4 lg:px-8 xl:py-5 xl:px-10"
                onClick={handleCancelDisable}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {showInactiveProducts && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg md:p-8 lg:p-10 xl:p-12">
            <h3 className="text-lg font-bold mb-4 md:text-xl lg:text-2xl xl:text-3xl">Productos Inactivos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white p-4 rounded shadow-md md:p-6 lg:p-8 xl:p-10"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-contain mb-2 md:h-64 lg:h-80 xl:h-96"
                  />
                  <h4 className="text-lg font-bold mb-2 md:text-xl lg:text-2xl xl:text-3xl">{product.name}</h4>
                  <p className="text-gray-600 mb-2 md:text-lg lg:text-xl xl:text-2xl">{product.description}</p>
                  <p className="text-gray-600 mb-2 md:text-lg lg:text-xl xl:text-2xl">Precio: ${product.price}</p>
                </div>
              ))}
            </div>
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded md:py-3 md:px-6 lg:py-4 lg:px-8 xl:py-5 xl:px-10"
              onClick={() => setShowInactiveProducts(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-wrap justify-center md:justify-between lg:justify-around xl:justify-between">
        <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4 md:p-6 lg:p-8 xl:p-10">
          <div className="bg-gray-100 p-4 rounded md:p-6 lg:p-8 xl:p-10">
            <h3 className="text-lg font-bold mb-2 md:text-xl lg:text-2xl xl:text-3xl">Seleccionar</h3>
            <button
              className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-2 md:py-3 md:px-6 lg:py-4 lg:px-8 xl:py-5 xl:px-10 ${
                selectedCategory === 'Todas' ? 'bg-red-700' : ''
              }`}
              onClick={() => handleCategoryChange('Todas')}
            >
              Todas
            </button>
            <button
              className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-2 md:py-3 md:px-6 lg:py-4 lg:px-8 xl:py-5 xl:px-10 ${
                selectedCategory === 'Accesorios Deportivos'
                  ? 'bg-red-700'
                  : ''
              }`}
              onClick={() => handleCategoryChange('Accesorios Deportivos')}
            >
              Accesorios Deportivos
            </button>
            <button
              className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-2 md:py-3 md:px-6 lg:py-4 lg:px-8 xl:py-5 xl:px-10 ${
                selectedCategory === 'Máquina' ? 'bg-red-700' : ''
              }`}
              onClick={() => handleCategoryChange('Máquina')}
            >
              Máquina
            </button>
            <button
              className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-2 md:py-3 md:px-6 lg:py-4 lg:px-8 xl:py-5 xl:px-10 ${
                selectedCategory === 'Equipo de Ejercicios'
                  ? 'bg-red-700'
                  : ''
              }`}
              onClick={() => handleCategoryChange('Equipo de Ejercicios')}
            >
              Equipo de Ejercicios
            </button>
            <button
              className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-2 md:py-3 md:px-6 lg:py-4 lg:px-8 xl:py-5 xl:px-10 ${
                selectedCategory === 'Ropa Deportiva' ? 'bg-red-700' : ''
              }`}
              onClick={() => handleCategoryChange('Ropa Deportiva')}
            >
              Ropa Deportiva
            </button>
            <button
              className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-2 md:py-3 md:px-6 lg:py-4 lg:px-8 xl:py-5 xl:px-10 ${
                selectedCategory === 'Suplementos' ? 'bg-red-700' : ''
              }`}
              onClick={() => handleCategoryChange('Suplementos')}
            >
              Suplementos
            </button>
          </div>
        </div>
        <div className="w-full md:w-1/2 lg:w-2/3 xl:w-3/4 p-4 md:p-6 lg:p-8 xl:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white p-4 rounded shadow-md md:p-6 lg:p-8 xl:p-10"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-contain mb-2 md:h-64 lg:h-80 xl:h-96"
                />
                <h4 className="text-lg font-bold mb-2 md:text-xl lg:text-2xl xl:text-3xl">{product.name}</h4>
                <p className="text-gray-600 mb-2 md:text-lg lg:text-xl xl:text-2xl">{product.description}</p>
                <p className="text-gray-600 mb-2 md:text-lg lg:text-xl xl:text-2xl">Precio: ${product.price}</p>
                <button
 className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-2 md:py-3 md:px-6 lg:py-4 lg:px-8 xl:py-5 xl:px-10 ${
                    product.active ? 'bg-green-500' : 'bg-red-500'
                  }`}
                  onClick={product.active ? () => handleDisableConfirmation(product) : () => handleProductActivation(product.id)}
                >
                  {product.active ? 'Deshabilitar' : 'Activar'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function NewProductForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState(''); // Nuevo estado para la descripción.
  const [price, setPrice] = useState(0); // Nuevo estado por precio.
  const [active, setActive] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    const reader = new FileReader();
    reader.onload = (e) => {
      onSubmit({
        id: Date.now(),
        name,
        image: e.target.result,
        category,
        description, // Inclui descripción en el objeto.
        price, // Inclui precio en el objeto.
        active,
      });
    };
    if (image) {
      reader.readAsDataURL(image);
    } else {
      // Maneje el caso donde no se selecciona ninguna imagen.
      onSubmit({
        id: Date.now(),
        name,
        image: 'placeholder.jpg', // Reemplazar con la ruta de imagen de marcador de posición predeterminada.
        category,
        description, // Inclui descripción en el objeto.
        price, // Inclui precio en el objeto.
        active,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md md:p-6 lg:p-8 xl:p-10">
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-bold mb-2 md:text-lg lg:text-xl xl:text-2xl">
          Nombre del producto
        </label>
        <input
          type="text"
          id="name"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline md:py-3 md:px-6 lg:py-4 lg:px-8 xl:py-5 xl:px-10"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="image" className="block text-gray-700 font-bold mb-2 md:text-lg lg:text-xl xl:text-2xl">
          Imagen
        </label>
        <input
          type="file"
          id="image"
          accept="image/*"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline md:py-3 md:px-6 lg:py-4 lg:px-8 xl:py-5 xl:px-10"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="category" className="block text-gray-700 font-bold mb-2 md:text-lg lg:text-xl xl:text-2xl">
          Categoría
        </label>
        <select
          id="category"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline md:py-3 md:px-6 lg:py-4 lg:px-8 xl:py-5 xl:px-10"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Seleccionar categoría</option>
          <option value="Accesorios Deportivos">Accesorios Deportivos</option>
          <option value="Máquina">Máquina</option>
          <option value="Equipo de Ejercicios">
            Equipo de Ejercicios
          </option>
          <option value="Ropa Deportiva">Ropa Deportiva</option>
          <option value="Suplementos">Suplementos</option>
        </select>
      </div>
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-gray-700 font-bold mb-2 md:text-lg lg:text-xl xl:text-2xl"
        >
          Descripción
        </label>
        <textarea
          id="description"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline md:py-3 md:px-6 lg:py-4 lg:px-8 xl:py-5 xl:px-10"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="price" className="block text-gray-700 font-bold mb-2 md:text-lg lg:text-xl xl:text-2xl">
          Precio
        </label>
        <input
          type="number"
          id="price"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline md:py-3 md:px-6 lg:py-4 lg:px-8 xl:py-5 xl:px-10"
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value))}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="active" className="block text-gray-700 font-bold mb-2 md:text-lg lg:text-xl xl:text-2xl">
          Activo
        </label>
        <input
          type="checkbox"
          id="active"
          className="form-checkbox md:py-3 md:px-6 lg:py-4 lg:px-8 xl:py-5 xl:px-10"
          checked={active}
          onChange={(e) => setActive(e.target.checked)}
        />
      </div>
      <button
        type="submit"
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline md:py-3 md:px-6 lg:py-4 lg:px-8 xl:py-5 xl:px-10"
      >
        Registrar Producto
      </button>
    </form>
  );
}

export default Lista_Productos;