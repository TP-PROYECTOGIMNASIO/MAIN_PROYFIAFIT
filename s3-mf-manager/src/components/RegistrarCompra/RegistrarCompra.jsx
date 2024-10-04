import './RegistrarC.css';
import { useState, useEffect } from 'react';

export default function RegistrarCompra() {
  const [nombreProducto, setNombreProducto] = useState("");
  const [tipoProducto, setTipoProducto] = useState("");
  const [fechaCompra, setFechaCompra] = useState("");
  const [precioTotal, setPrecioTotal] = useState("");
  const [cantidadComprada, setCantidadComprada] = useState("");
  const [boletaCompra, setBoletaCompra] = useState("");
  const [sede, setSede] = useState("");
  const [productData, setProductData] = useState([]);
  const [tiposProducto, setTiposProducto] = useState([]);
  const [productos, setProductos] = useState([]);
  const [sedes, setSedes] = useState([]);

  // Función para obtener los tipos de productos
  const obtenerTiposProducto = async () => {
    try {
      const response = await fetch("https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/compras/hu-tp-61", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "fetchProductTypes" }),
      });
      const result = await response.json();
      setTiposProducto(result.map((tipo) => ({
        id: tipo.product_type_id,
        name: tipo.product_type_name,
      })));
    } catch (error) {
      console.error("Error al obtener tipos de productos:", error);
    }
  };

  // Función para obtener productos según el tipo seleccionado
  const obtenerProductosPorTipo = async (tipoId) => {
    try {
      const response = await fetch("https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/compras/hu-tp-61", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "fetchProductsByType", productTypeId: tipoId }),
      });
      const result = await response.json();
      setProductos(result.map((producto) => ({
        id: producto.product_id,
        name: producto.product_name,
      })));
    } catch (error) {
      console.error("Error al obtener productos por tipo:", error);
    }
  };

  // Función para obtener las sedes
  const obtenerSedes = async () => {
    try {
      const response = await fetch("https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/compras/hu-tp-61", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "fetchLocations" }),
      });
      const result = await response.json();
      setSedes(result.map((sede) => ({
        id: sede.location_id,
        name: sede.name,
      })));
    } catch (error) {
      console.error("Error al obtener sedes:", error);
    }
  };

  useEffect(() => {
    obtenerTiposProducto();
    obtenerSedes();
  }, []);

  useEffect(() => {
    if (tipoProducto) {
      obtenerProductosPorTipo(tipoProducto);
    }
  }, [tipoProducto]);

  const handleGuardar = async () => {
    const tipoProductoSeleccionado = tiposProducto.find(tipo => tipo.id === parseInt(tipoProducto));
    const productoSeleccionado = productos.find(producto => producto.id === parseInt(nombreProducto));

    const productDataToSend = {
      action: "almacenarTemporalmente",
      products: [
        {
          product_id: parseInt(nombreProducto, 10),
          purchase_date: fechaCompra,
          purchase_quantity: parseInt(cantidadComprada, 10),
          total_price: parseFloat(precioTotal),
          purchase_receipt_url: boletaCompra,
          location_id: parseInt(sede, 10),
        },
      ],
    };

    try {
      const response = await fetch("https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/compras/hu-tp-61", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productDataToSend),
      });

      const result = await response.json();
      if (response.ok) {
        setProductData((prevData) => [
          ...prevData,
          {
            report_product_id: result.report_product_id,
            purchase_date: fechaCompra,
            product_type_name: tipoProductoSeleccionado ? tipoProductoSeleccionado.name : "",
            product_name: productoSeleccionado ? productoSeleccionado.name : "",
            purchase_quantity: cantidadComprada,
            total_price: precioTotal,
          },
        ]);

        // Limpiar los campos después de agregar el producto
        setNombreProducto("");
        setTipoProducto("");
        setFechaCompra("");
        setPrecioTotal("");
        setCantidadComprada("");
        setBoletaCompra("");
        setSede("");
      } else {
        console.error("Error al guardar productos temporalmente:", result);
        alert(`Error al guardar productos: ${result.error}`);
      }
    } catch (error) {
      console.error("Error en la llamada a la API:", error);
      alert("Error en la llamada a la API. Por favor, intente nuevamente.");
    }
  };

  const handleSaveProducts = async () => {
    try {
      const response = await fetch('https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/compras/hu-tp-61', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'guardarInforme',
        }),
      });

      const result = await response.json();
      alert(result.message); // Mostrar mensaje de confirmación
    } catch (error) {
      console.error('Error al guardar productos:', error);
    }
  };

  return (
    <div className="containerRP">
      <div className="d-flex justify-content-between">
        <div className="form-containerAP">
          <h2>Agregar Producto</h2>
          <div className="form-groupAP">
            <label htmlFor="tipoProducto">Tipo de Producto</label>
            <select id="tipoProducto" value={tipoProducto} onChange={e => setTipoProducto(e.target.value)}>
              <option value="">Selecciona un tipo</option>
              {tiposProducto.map((tipo) => (
                <option key={tipo.id} value={tipo.id}>
                  {tipo.name}
                </option>
              ))}
            </select>

            <label htmlFor="nombreProducto">Nombre del Producto</label>
            <select id="nombreProducto" value={nombreProducto} onChange={e => setNombreProducto(e.target.value)}>
              <option value="">Selecciona un producto</option>
              {productos.map((producto) => (
                <option key={producto.id} value={producto.id}>
                  {producto.name}
                </option>
              ))}
            </select>

            <label htmlFor="fechaCompra">Fecha de Compra</label>
            <input
              type="date"
              id="fechaCompra"
              value={fechaCompra}
              onChange={e => setFechaCompra(e.target.value)}
            />

            <label htmlFor="cantidadComprada">Cantidad Comprada</label>
            <input
              type="number"
              id="cantidadComprada"
              value={cantidadComprada}
              onChange={e => setCantidadComprada(e.target.value)}
            />

            <label htmlFor="precioTotal">Precio Total</label>
            <input
              type="number"
              id="precioTotal"
              value={precioTotal}
              onChange={e => setPrecioTotal(e.target.value)}
            />

            <label htmlFor="boletaCompra">Boleta de Compra</label>
            <input type="file" id="boletaCompra" onChange={e => setBoletaCompra(e.target.files[0]?.name || "")} />

            <label htmlFor="sede">Sede</label>
            <select id="sede" value={sede} onChange={e => setSede(e.target.value)}>
              <option value="">Seleccionar sede</option>
              {sedes.map((sede) => (
                <option key={sede.id} value={sede.id}>
                  {sede.name}
                </option>
              ))}
            </select>

            <button type="button" className="btn-guardarP" onClick={handleGuardar}>
              Guardar
            </button>
          </div>
        </div>

        <div className="containerListaC">
          <h3 className="title">Lista de Compras</h3>
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Fecha</th>
                <th>Tipo Producto</th>
                <th>Nombre Producto</th>
                <th>Cantidad</th>
                <th>Precio Venta</th>
              </tr>
            </thead>
            <tbody>
              {productData.length > 0 ? (
                productData.map((product, index) => (
                  <tr key={product.report_product_id}>
                    <td>{index + 1}</td>
                    <td>{product.purchase_date}</td>
                    <td>{product.product_type_name}</td>
                    <td>{product.product_name}</td>
                    <td>{product.purchase_quantity}</td>
                    <td>{product.total_price} soles</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">No hay productos registrados.</td>
                </tr>
              )}
            </tbody>
          </table>
          <button className="btn-guardarP" onClick={handleSaveProducts}>
            Guardar Productos
          </button>
        </div>
      </div>
    </div>
  );
}

             
