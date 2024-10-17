import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Productos = () => {
  const { locationId } = useParams(); // Obtener el ID de la sede de los parámetros de la URL
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tipoProducto, setTipoProducto] = useState(""); // Estado para el filtro de tipo
  const [nombreProducto, setNombreProducto] = useState(""); // Estado para el filtro de nombre
  const [tiposDeProducto, setTiposDeProducto] = useState([]); // Estado para los tipos de productos

  useEffect(() => {
    fetchProductos();
  }, [locationId, tipoProducto, nombreProducto]);

  useEffect(() => {
    fetchTiposDeProducto(); // Cargar los tipos de productos al montar el componente
  }, []);

  const fetchProductos = async () => {
    try {
      setLoading(true);
      setError(null);

      // Construye la URL con los filtros de tipo de producto y nombre
      let url = `https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/productos/hu-tp-68/viewdetails?id_sede=${locationId}`;
      if (tipoProducto) {
        url += `&typeproduct=${tipoProducto}`;
      }
      if (nombreProducto) {
        url += `&product_name=${nombreProducto}`;
      }

      // Realiza la llamada a la API
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Error al obtener productos: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setProductos(data);
    } catch (error) {
      console.error("Error al obtener productos:", error);
      setError("Hubo un problema al cargar los productos. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const fetchTiposDeProducto = async () => {
    try {
      // Realiza la llamada a la API para obtener los tipos de productos
      const response = await fetch("https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/productos/hu-tp-67/typeproduct");

      if (!response.ok) {
        throw new Error(`Error al obtener tipos de producto: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setTiposDeProducto(data);
    } catch (error) {
      console.error("Error al obtener tipos de producto:", error);
      setError("Hubo un problema al cargar los tipos de productos. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Botón Regresar */}
      <div className="flex justify-start pl-8 pt-4">
        <Link
          className="flex items-center justify-center gap-1 text-black"
          to={"/Inventario-Sede"}
        >
          <strong className="h-full flex items-center text-center text-[24px] font-bold">
            &lt;
          </strong>
          <span className="h-full flex items-center text-center mt-1">
            Regresar
          </span>
        </Link>
      </div>

      {/* Contenido principal */}
      <main className="py-8 px-8">
        

        {/* Filtros y Ordenar */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-4 items-center">
            <span className="text-gray-700 font-semibold">Ordenar por:</span>
            <select
              className="border border-gray-300 rounded-lg py-2 px-4"
              value={tipoProducto}
              onChange={(e) => setTipoProducto(e.target.value)}
            >
              <option value="">Todos los Tipos</option>
              {tiposDeProducto.map((tipo) => (
                <option key={tipo.product_type_id} value={tipo.product_type_id}>
                  {tipo.product_type_name}
                </option>
              ))}
            </select>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar producto"
              className="border border-gray-300 rounded-lg py-2 px-4"
              value={nombreProducto}
              onChange={(e) => setNombreProducto(e.target.value)}
            />
            <button
              className="absolute top-1/2 right-3 transform -translate-y-1/2"
              onClick={fetchProductos}
            >
              🔍
            </button>
          </div>
        </div>

        {/* Mensaje de carga */}
        {loading && <p>Cargando productos...</p>}

        {/* Mensaje de error */}
        {error && <p className="text-red-600">{error}</p>}

        {/* Tabla de productos */}
        {!loading && !error && (
          <div className="bg-white shadow-lg rounded-lg overflow-hidden mx-auto max-w-6xl p-6">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="px-4 py-2">Imagen del producto</th>
                  <th className="px-4 py-2">Nombre</th>
                  <th className="px-4 py-2">Cantidad</th>
                  <th className="px-4 py-2">Precio de Venta</th>
                  <th className="px-4 py-2">Tipo de Producto</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {productos.length > 0 ? (
                  productos.map((producto) => (
                    <tr key={producto.product_id} className="border-b">
                      <td className="px-4 py-4">
                        <img
                          src={producto.imagen || "https://via.placeholder.com/50"}
                          alt={producto.producto}
                          className="mx-auto"
                          style={{ width: "115px", height: "115px" }} // Ajustar el tamaño de la imagen
                        />
                      </td>
                      <td className="px-4 py-4">{producto.producto}</td>
                      <td className="px-4 py-4">{producto.stock}</td>
                      <td className="px-4 py-4">{producto.price} soles</td>
                      <td className="px-4 py-4">{producto.tipoproducto}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-4">
                      No hay productos disponibles en esta sede.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default Productos;
