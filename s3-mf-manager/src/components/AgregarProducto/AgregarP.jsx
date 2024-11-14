import './AgregarP.css';
import { useState, useEffect } from 'react';
import ListaCompras from '../ListaCompras/ListaCompras';

export default function AgregarP({ reportId, onReturn }) {
  const [nombreProducto, setNombreProducto] = useState("");
  const [tipoProducto, setTipoProducto] = useState("");
  const [fechaCompra, setFechaCompra] = useState("");
  const [precioTotal, setPrecioTotal] = useState("");
  const [cantidadComprada, setCantidadComprada] = useState("");
  const [boletaCompra, setBoletaCompra] = useState("");
  const [sede, setSede] = useState("");
  const [vista, setVista] = useState(false);
  const [productData, setProductData] = useState([]);
  const [tiposProducto, setTiposProducto] = useState([]);
  const [productos, setProductos] = useState([]);
  const [sedes, setSedes] = useState([]);

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

  const handleNombreChange = (event) => setNombreProducto(event.target.value);
  const handleTipoChange = (event) => setTipoProducto(event.target.value);
  const handleFechaChange = (event) => setFechaCompra(event.target.value);
  const handlePrecioChange = (event) => setPrecioTotal(event.target.value);
  const handleCantidadChange = (event) => setCantidadComprada(event.target.value);
  const handleBoletaChange = (event) => setBoletaCompra(event.target.files[0]?.name || "");
  const handleSedeChange = (event) => setSede(event.target.value);

  const handleGuardarProducto = async () => {
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
        setVista(true);
        setProductData((prevData) => [...prevData, { ...productDataToSend, report_product_id: result.report_product_id }]);
      } else {
        alert(`Error al guardar productos: ${result.error}`);
      }
    } catch (error) {
      alert("Error en la llamada a la API. Por favor, intente nuevamente.");
    }
  };

  const handleGuardarInforme = async () => {
    if (productData.length === 0) {
      alert("Para guardar un Informe debe registrar algún producto.");
      return;
    }

    const confirmarGuardado = window.confirm("¿Estás seguro de guardar el Informe?");
    if (!confirmarGuardado) return;

    try {
      const response = await fetch("https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/compras/hu-tp-61", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "guardarInforme", reportId }),
      });

      if (response.ok) {
        alert("Se guardó el informe correctamente");
        onReturn(); // Regresa a la ventana anterior
      } else {
        alert("Error al guardar el informe");
      }
    } catch (error) {
      alert("Error al intentar guardar el informe. Por favor, intente nuevamente.");
    }
  };
  return (
    <div className="containerGenerarAP">
      <div className="app">
        {vista ? (
          <ListaCompras
            vista={vista}
            setVista={setVista}
            productData={productData}
            setProductData={setProductData}
          />
        ) : (
          <div className="form-containerAP">
            <h2>Agregar Productosss</h2>
            <div className="form-groupAP">
              <div className="row">
                <div className="column">
                  <label htmlFor="tipoProducto">Tipo de Producto</label>
                  <select id="tipoProducto" value={tipoProducto} onChange={handleTipoChange}>
                    <option value="">Selecciona un tipo</option>
                    {tiposProducto.map((tipo) => (
                      <option key={tipo.id} value={tipo.id}>{tipo.name}</option>
                    ))}
                  </select>
                </div>
                <div className="column">
                  <label htmlFor="nombreProducto">Nombre del Producto</label>
                  <select id="nombreProducto" value={nombreProducto} onChange={handleNombreChange}>
                    <option value="">Selecciona un producto</option>
                    {productos.map((producto) => (
                      <option key={producto.id} value={producto.id}>{producto.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="form-groupAP">
              <div className="row">
                <div className="column">
                  <label htmlFor="fechaCompra">Fecha de Compra</label>
                  <input type="date" id="fechaCompra" value={fechaCompra} onChange={handleFechaChange} />
                </div>
                <div className="column">
                  <label htmlFor="cantidadComprada">Cantidad Comprada</label>
                  <input type="number" id="cantidadComprada" placeholder="Cantidad" value={cantidadComprada} onChange={handleCantidadChange} />
                </div>
              </div>
            </div>
            <div className="form-groupAP">
              <div className="row">
                <div className="column">
                  <label htmlFor="precioTotal">Precio Total</label>
                  <input type="number" id="precioTotal" placeholder="Precio" value={precioTotal} onChange={handlePrecioChange} />
                </div>
                <div className="column">
                  <label htmlFor="boletaCompra">Boleta de Compra</label>
                  <input type="file" id="boletaCompra" onChange={handleBoletaChange} />
                </div>
              </div>
            </div>
            <div className="form-groupAS">
              <div className="row">
                <div className="column">
                  <label htmlFor="sede">Sede</label>
                  <select id="sede" value={sede} onChange={handleSedeChange}>
                    <option value="">Selecciona una sede</option>
                    {sedes.map((sede) => (
                      <option key={sede.id} value={sede.id}>{sede.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="form-buttonsAP">
              <button onClick={handleGuardarProducto}>Guardar Producto</button>
              <button onClick={handleGuardarInforme}>Guardar Informe</button>
              <button onClick={onReturn}>Regresar</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
