import { useState, useEffect } from "react";
import { ShoppingCartIcon } from "./icons";
import { useShoppingCart } from "../hooks";
import ShoppingCart from "./shopping-cart";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [showCart, setShowCart] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false); // Estado para datos cargados
  const { products } = useShoppingCart();
  const navigate = useNavigate(); // Cambiado a useNavigate

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/productos/hu-tp-17");
        const data = await response.json();
        setIsDataLoaded(data && data.length > 0); // Verifica si hay datos
      } catch (error) {
        console.error("Error fetching products:", error);
        setIsDataLoaded(false);
      }
    };

    fetchData();
  }, []);

  const handleProductsClick = () => {
    if (isDataLoaded) {
      navigate("/productos"); // Navega a productos si hay datos
    } else {
      alert("No hay productos disponibles en este momento."); // Mensaje de alerta
    }
  };

  return (
    <nav className="min-h-[10vh] flex justify-between p-2" style={{ backgroundColor: "#FFFFFF" }}>
      <Link to="/">
        <img src="/logo-3.png" alt="logo fia fit" className="w-[30vh] h-[10vh]" />
      </Link>
      <div className="flex flex-row items-center mr-4 gap-20">
        <Link to="/">
          <h1 className="text-[20px] font-bold" style={{ color: "#4B4F57" }}>Inicio</h1>
        </Link>
        <Link to="/">
          <h1 className="text-[20px] font-bold" style={{ color: "#4B4F57" }}>Eventos</h1>
        </Link>
        {/* Cambia Link por un botón para manejar la validación */}
        <button onClick={handleProductsClick} className="text-[20px] font-bold" style={{ color: "#4B4F57" }}>
          Productos
        </button>
        <div className="relative flex items-center">
          <button
            className="hover:bg-slate-200/20 rounded-full p-2 flex items-center gap-1"
            onClick={() => setShowCart(!showCart)}
          >
            <ShoppingCartIcon />
            <div className="bg-gray p-1 text-xs text-gray-900 w-6 h-6 rounded-[50%] flex items-center justify-center">
              <span>{products.length > 0 ? products.length : "0"}</span>
            </div>
          </button>
          {showCart && (
            <div className="absolute top-12 right-0 w-max">
              <ShoppingCart />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
