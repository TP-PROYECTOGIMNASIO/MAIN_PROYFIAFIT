import { useState } from "react";
import { useShoppingCart } from "../../hooks";

const ProductModal = ({ product, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const { addProduct } = useShoppingCart();

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    addProduct(product, quantity);
    onClose(); // Cierra el modal después de agregar al carrito
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-auto relative">
        {/* Botón de cerrar */}
        <button
          onClick={onClose} // Asegurarse de que esté correctamente asociado
          className="absolute top-2 right-2 text-2xl font-bold text-gray-600 hover:text-gray-800"
        >
          ✖
        </button>

        {/* Nombre del producto */}
        <h2 className="text-2xl font-bold mb-4 text-center">{product.name}</h2>

        {/* Imagen del producto */}
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-48 object-contain mb-4"
        />

        {/* Detalles del producto */}
        <div className="mb-4">
          <span className="font-medium">Precio: </span>
          <span className="text-red-500">$ {product.price}</span>
        </div>
        <div className="mb-4">
          <span className="font-medium">Detalles del Producto:</span>
          <p>{product.description}</p>
        </div>

        {/* Controles de cantidad */}
        <div className="flex items-center justify-center mb-4">
          <button
            onClick={decreaseQuantity}
            className="bg-gray-200 px-2 py-1 font-bold"
          >
            -
          </button>
          <span className="mx-2">{quantity}</span>
          <button
            onClick={increaseQuantity}
            className="bg-gray-200 px-2 py-1 font-bold"
          >
            +
          </button>
        </div>

        {/* Botón para agregar al carrito */}
        <button
          onClick={handleAddToCart}
          className="bg-red-700 hover:bg-green-800 text-slate-200 font-medium border rounded-lg px-4 py-2 w-full"
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
};

export default ProductModal;
