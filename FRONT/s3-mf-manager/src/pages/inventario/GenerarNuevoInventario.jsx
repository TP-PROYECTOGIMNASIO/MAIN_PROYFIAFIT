import React from 'react';
import './styles/GenerarNuevoInventario.css'; // Importa el archivo de estilos CSS para el componente

const inputClasses = "border border-border rounded-lg p-3 w-full placeholder-custom"; // Clases para los inputs del formulario
const labelClasses = "block text-muted-foreground"; // Clases para las etiquetas de los inputs
const buttonClasses = "bg-red-600 text-white hover:bg-red-700 rounded-lg p-3 w-full"; // Clases para el botón de guardar, con fondo rojo y texto blanco
const closeButtonClasses = "text-black cursor-pointer hover:text-gray-700 text-xl"; // Clases para el botón de cerrar (X), con color negro y efecto hover

const GenerarNuevoInventario = () => {
  return (
    <div className="flex flex-col modal-container bg-background p-6 rounded-lg shadow-lg max-w relative max-h-[500px]">
      <div className="modal-header mb-4 flex items-start justify-end">
       
        
      </div>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-primary">Generar Nuevo Inventario</h2>
        </div>


      <div className="form-grid mb-4">
        <div className="form-item">
          <label className={labelClasses} htmlFor="producto">Producto</label>
          <input type="text" id="producto" className={inputClasses} placeholder=" " />
        </div>
        <div className="form-item">
          <label className={labelClasses} htmlFor="precio-venta">Precio de venta</label>
          <input type="text" id="precio-venta" className={inputClasses} placeholder=" " />
        </div>
        <div className="form-item">
          <label className={labelClasses} htmlFor="cantidad">Cantidad</label>
          <input type="number" id="cantidad" className={inputClasses} placeholder=" " />
        </div>
      </div>

      <div className="mb-4 flex flex-col">
        <div className="form-item">
          <label className={labelClasses} htmlFor="asignar">Asignar a:</label>
          <select id="asignar" className={inputClasses}>
            <option value="la-molina">La Molina</option>
            <option value="miraflores">Miraflores</option>
            <option value="santa-anita">Santa Anita</option>
          </select>
        </div>
        <button className={buttonClasses}>GUARDAR</button>
      </div>
    </div>
  );
};

export default GenerarNuevoInventario;
