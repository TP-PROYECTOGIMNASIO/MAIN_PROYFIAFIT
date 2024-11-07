import { useState, useEffect } from "react";
import { useShoppingCart } from "../../hooks";
import Modal from "../modal/ProductModal";

export default function ProductList() {
  const { products, addProduct } = useShoppingCart();
  const [dataProducts, setDataProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const apiUrl17 = import.meta.env.VITE_APP_API_URL_17;

  const params = new URLSearchParams(window.location.search);
  console.log("Todos los parámetros en Lista de Productos:", window.location.search); // Verificar que todos los parámetros están presentes
  
  const role = params.get("role");
  const token = params.get("token");
  const username = params.get("username");
  console.log("role recibido en Lista de Productos clientes:", role);
  console.log("token recibido en Lista de Productos clientes:", token);
  console.log("username recibido en Lista de Productos clientes:", username);

  // Función para verificar si un producto ya está en el carrito
  const checkAvailableToAddCart = (productId) => {
    return Boolean(products.find((product) => product.product_id === productId));
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${apiUrl17}`
        );
        const data = await response.json();
        setDataProducts(data);
        setLoading(false);

        // Obtiene las categorías únicas de los productos
        const uniqueCategories = [
          "Todas",
          ...new Set(data.map((product) => product.category)),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filtrar productos según la categoría seleccionada, el término de búsqueda y si están activos
  const filteredProducts = dataProducts
    .filter(
      (product) =>
        product.active && // Filtra productos que estén activos
        (selectedCategory === "Todas" || product.category === selectedCategory) &&
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  if (loading) {
    return <p>Cargando productos...</p>;
  }

  return (
    <div className="w-full max-w-6xl px-4 mx-auto mt-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Filtro de Categorías */}
      <div className="lg:col-span-1 bg-gray-100 p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Tipo de Productos</h2>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category}>
              <button
                onClick={() => setSelectedCategory(category)}
                className={`block w-full text-left p-2 rounded-lg ${
                  selectedCategory === category
                    ? "bg-red-600 text-white"
                    : "bg-white text-gray-700"
                }`}
              >
                {category}
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

      {/* Lista de Productos */}
      <div className="lg:col-span-3 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* Título "Catálogo de productos" */}
        <h1 className="lg:col-span-3 text-3xl font-bold text-red-600 mb-6">
          Catálogo de productos
        </h1>

        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.product_id}
              className="rounded-lg border bg-gray-400/10 flex flex-col h-full"
            >
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-48 object-contain bg-white mx-auto cursor-pointer"
                onClick={() => openModal(product)}
              />
              <div className="flex flex-col flex-grow gap-y-4 px-4 py-6">
                <h1 className="font-medium">{product.name}</h1>
                <p className="text-sm line-clamp-3">{product.description}</p>
                <span className="font-medium">$ {product.price}</span>
                <button
                  className="bg-red-700 hover:bg-green-800 text-slate-200 mt-auto font-medium border rounded-lg px-4 py-2 disabled:bg-gray-200 disabled:text-gray-400 disabled:hover:bg-gray-200"
                  onClick={() => {
                    // Asegurarse de agregar el producto correcto al carrito
                    if (!checkAvailableToAddCart(product.product_id)) {
                      addProduct(product);
                    }
                  }}
                  disabled={checkAvailableToAddCart(product.product_id)} // Desactivar si ya está en el carrito
                >
                  {checkAvailableToAddCart(product.product_id) ? "Agregado" : "Agregar al carrito"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="lg:col-span-3 text-xl text-gray-500">
            No hay productos disponibles en esta categoría.
          </p>
        )}
      </div>

      {/* Modal de detalles de productos */}
      {isModalOpen && selectedProduct && (
        <Modal product={selectedProduct} onClose={closeModal} />
      )}
    </div>
  );
}
