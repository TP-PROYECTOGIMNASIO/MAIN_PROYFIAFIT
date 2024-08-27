import React from 'react';
import './styles/GenerarNuevoInventario.css'; // Importa el archivo de estilos CSS para el componente

// Clases de estilo para los elementos del formulario
const inputClasses = "border border-border rounded-lg p-2 w-full placeholder-custom"; // Clases para los inputs del formulario
const labelClasses = "block text-muted-foreground"; // Clases para las etiquetas de los inputs
const buttonClasses = "bg-red-600 text-white hover:bg-red-700 rounded-lg p-2 w-full"; // Clases para el botón de guardar, con fondo rojo y texto blanco
const closeButtonClasses = "text-black cursor-pointer hover:text-gray-700 text-xl"; // Clases para el botón de cerrar (X), con color negro y efecto hover

const GenerarNuevoInventario = () => {
  return (
    <div className="modal-container bg-background p-6 rounded-lg shadow-lg max-w-md mx-auto relative">
      {/* Contenedor principal del modal */}
      
      <div className="modal-header mb-4 flex items-start justify-end">
        {/* Cabecera del modal, con un margen inferior */}
        {/* Aquí debería ir el título del modal y el botón de cerrar (X) */}
      </div>

      <div className="text-center mb-6">
        {/* Contenedor para el título del modal */}
        <h2 className="text-2xl font-bold text-primary">Generar Nuevo Inventario</h2>
        {/* Título del modal, con texto centrado */}
      </div>

      <div className="form-grid mb-4">
        {/* Contenedor para el formulario */}
        <div className="form-item">
          {/* Elemento del formulario para el producto */}
          <label className={labelClasses} htmlFor="producto">Producto</label>
          <input type="text" id="producto" className={inputClasses} placeholder="Ingrese el producto" />
          {/* Input para el producto */}
        </div>
        <div className="form-item">
          {/* Elemento del formulario para el precio de venta */}
          <label className={labelClasses} htmlFor="precio-venta">Precio de venta</label>
          <input type="text" id="precio-venta" className={inputClasses} placeholder="Ingrese el precio" />
          {/* Input para el precio de venta */}
        </div>
        <div className="form-item">
          {/* Elemento del formulario para la cantidad */}
          <label className={labelClasses} htmlFor="cantidad">Cantidad</label>
          <input type="number" id="cantidad" className={inputClasses} placeholder="Ingrese la cantidad" />
          {/* Input para la cantidad */}
        </div>
      </div>

      <div className="mb-4 flex flex-col">
        {/* Contenedor para la sección de asignar y el botón de guardar */}
        <div className="form-item">
          {/* Elemento del formulario para asignar */}
          <label className={labelClasses} htmlFor="asignar">Asignar a:</label>
          <select id="asignar" className={inputClasses}>
            <option value="la-molina">La Molina</option>
            <option value="miraflores">Miraflores</option>
            <option value="santa-anita">Santa Anita</option>
          </select>
          {/* Selector para asignar */}
        </div>
        <button className={buttonClasses} style={{ marginTop: '1rem', alignSelf: 'center' }}>GUARDAR</button>
        {/* Botón de guardar, con estilo de fondo rojo y texto blanco */}
      </div>
    </div>
  );
};

export default GenerarNuevoInventario;
