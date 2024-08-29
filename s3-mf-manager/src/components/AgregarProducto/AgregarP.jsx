import '../../App.css'
import  {  useState } from "react";
import ListaCompras from "../ListaCompras/ListaCompras";



export default function AgregarP() {
  const [imagenProducto, setImagenProducto] = useState("");
  const [nombreProducto, setNombreProducto] = useState("");
  const [tipoProducto, setTipoProducto] = useState("");
  const [descripcionProducto, setDescripcionProducto] = useState("");
  const [fechaCompra, setFechaCompra] = useState("");
  const [precioTotal, setPrecioTotal] = useState("");
  const [cantidadComprada, setCantidadComprada] = useState("");
  const [boletaCompra, setBoletaCompra] = useState("");
  const [vista, setVista] = useState(false);
  const [productData, setProductData] = useState(null);

  const handleImagenUpload = (event) => {
    setImagenProducto(event.target.value);
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
    setBoletaCompra(event.target.value);
  };

  const handleGuardar = () => {
    // Aquí puedes agregar la lógica para guardar los datos del producto
    const EmployeeData = {
      imagenProducto,
      nombreProducto,
      tipoProducto,
      descripcionProducto,
      fechaCompra,
      precioTotal,
      cantidadComprada,
      boletaCompra,
    };

    console.log(EmployeeData);
    setProductData(EmployeeData);
    setVista(true);
  };

  return (
    
    <div className="containerGenerar">
    
    <div className="app">
      {vista ? (
        <ListaCompras
          vista={vista}
          setVista={setVista}
          productData={productData}
          setProductData={setProductData}
        />
      ) : (
        <div className="form-container">

          <h2>Agregar Producto</h2>
          <div className="form-group">
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
                  <option value="Pesas">Pesas</option>
                  <option value="Maquina">Maquina</option>
                  <option value="Vestimenta">Vestimenta</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>
            </div>
          </div>
          <div className="form-group">
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

          <div className="form-group">
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
          <div className="form-group">
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
                  value={boletaCompra}
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
