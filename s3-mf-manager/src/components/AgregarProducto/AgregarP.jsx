import './AgregarP.css';
import { useState } from 'react';
import ListaCompras from '../ListaCompras/ListaCompras';

export default function AgregarP({ reportId }) { 
  const [imagenProducto, setImagenProducto] = useState("");
  const [nombreProducto, setNombreProducto] = useState("");
  const [tipoProducto, setTipoProducto] = useState("");
  const [descripcionProducto, setDescripcionProducto] = useState("");
  const [fechaCompra, setFechaCompra] = useState("");
  const [precioTotal, setPrecioTotal] = useState("");
  const [cantidadComprada, setCantidadComprada] = useState("");
  const [boletaCompra, setBoletaCompra] = useState("");
  const [vista, setVista] = useState(false);
  const [productData, setProductData] = useState([]);

  const handleImagenUpload = (event) => {
    setImagenProducto(event.target.files[0]?.name || "");
  };

  const handleNombreChange = (event) => {
    setNombreProducto(event.target.value);
  };

  const handleTipoChange = (event) => {
    setTipoProducto(event.target.value);
  };

  const handleDescripcionChange = (event) => {
    setDescripcionProducto(event.target.value);
  };

  const handleFechaChange = (event) => {
    setFechaCompra(event.target.value);
  };

  const handlePrecioChange = (event) => {
    setPrecioTotal(event.target.value);
  };

  const handleCantidadChange = (event) => {
    setCantidadComprada(event.target.value);
  };

  const handleBoletaChange = (event) => {
    setBoletaCompra(event.target.files[0]?.name || "");
  };

  const handleGuardar = async () => {
    const productDataToSend = {
      action: "addProductToReport",
      reportId,
      image: imagenProducto,
      name: nombreProducto,
      purchaseDate: fechaCompra,
      totalPrice: parseFloat(precioTotal) || 0,
      product_type_id: parseInt(tipoProducto, 10) || 0,
      description: descripcionProducto,
      quantity: parseInt(cantidadComprada, 10) || 0,
      purchaseReceipt: boletaCompra,
    };

    try {
      const response = await fetch("https://p48s3kepwc.execute-api.us-east-2.amazonaws.com/default/GENERAR_INFORME_COMPRA", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productDataToSend),
      });

      const result = await response.json();
      if (response.ok) {
        setVista(true);
        setProductData(prevData => [...prevData, { ...productDataToSend, report_product_id: result.report_product_id }]);
      } else {
        console.error("Error al añadir producto:", result);
        alert(`Error al añadir producto: ${result.error}`);
      }
    } catch (error) {
      console.error("Error en la llamada a la API:", error);
      alert("Error en la llamada a la API. Por favor, intente nuevamente.");
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
            <h2>Agregar Producto</h2>
            <div className="form-groupAP">
              <div className="row">
                <div className="column">
                  <label htmlFor="imagenProducto">Imagen del Producto</label>
                  <input
                    type="file"
                    id="imagenProducto"
                    onChange={handleImagenUpload}
                  />
                </div>
                <div className="column">
                  <label htmlFor="tipoProducto">Tipo de Producto</label>
                  <select
                    id="tipoProducto"
                    value={tipoProducto}
                    onChange={handleTipoChange}
                  >
                    <option value="">Selecciona un tipo</option>
                    <option value="1">Pesas</option>
                    <option value="2">Maquina</option>
                    <option value="3">Vestimenta</option>
                    <option value="4">Otro</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="form-groupAP">
              <div className="row">
                <div className="column">
                  <label htmlFor="nombreProducto">Nombre del Producto</label>
                  <input
                    type="text"
                    id="nombreProducto"
                    placeholder="Nombres"
                    value={nombreProducto}
                    onChange={handleNombreChange}
                  />
                </div>
                <div className="column">
                  <label htmlFor="descripcionProducto">Breve Descripción</label>
                  <textarea
                    id="descripcionProducto"
                    placeholder="Descripción"
                    value={descripcionProducto}
                    onChange={handleDescripcionChange}
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="form-groupAP">
              <div className="row">
                <div className="column">
                  <label htmlFor="fechaCompra">Fecha de Compra</label>
                  <input
                    type="date"
                    id="fechaCompra"
                    value={fechaCompra}
                    onChange={handleFechaChange}
                  />
                </div>
                <div className="column">
                  <label htmlFor="cantidadComprada">Cantidad Comprada</label>
                  <input
                    type="number"
                    id="cantidadComprada"
                    placeholder="Cantidad"
                    value={cantidadComprada}
                    onChange={handleCantidadChange}
                  />
                </div>
              </div>
            </div>
            <div className="form-groupAP">
              <div className="row">
                <div className="column">
                  <label htmlFor="precioTotal">Precio Total</label>
                  <input
                    type="number"
                    id="precioTotal"
                    placeholder="Precio"
                    value={precioTotal}
                    onChange={handlePrecioChange}
                  />
                </div>
                <div className="column">
                  <label htmlFor="boletaCompra">Boleta de Compra</label>
                  <input
                    type="file"
                    id="boletaCompra"
                    onChange={handleBoletaChange}
                  />
                </div>
              </div>
            </div>

            <button type="button" className="btnAgregarP" onClick={handleGuardar}>
              Guardar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
