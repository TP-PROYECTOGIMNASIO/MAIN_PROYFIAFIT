import { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";
import '../styles/carito.css';

export const CarritoPage = () => {
    const { listaCompras, aumentarCantidad, disminuirCantidad, eliminarCompra } = useContext(CarritoContext);

    const calcularTotal = () => {
        return listaCompras.reduce((total, item) => total + item.price * item.cantidad, 0).toFixed(2);
    };

    const handleImpresion = () => {
        print();
    };

    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Precio</th>
                        <th scope="col" className="cantidad-col">Cantidad</th>
                        <th scope="col">Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {listaCompras.map(item => (
                        <tr key={item.product_type_id}>
                            <th>{item.product_name}</th>
                            <td>{item.price}</td>
                            <td className="d-flex align-items-center justify-content-center">
                                <button 
                                    className="btn btn-outline-primary btn-sm" 
                                    onClick={() => disminuirCantidad(item.product_type_id)}
                                >-</button>
                                <span className="mx-3">{item.cantidad}</span>
                                <button 
                                    className="btn btn-outline-primary btn-sm" 
                                    onClick={() => aumentarCantidad(item.product_type_id)}
                                >+</button>
                            </td>
                            <td>
                                <button
                                    type="button"
                                    className="btn btn-danger btn-sm"
                                    onClick={() => {
                                        console.log('Eliminar clicked', item.product_type_id); // Agrega este log para depuración
                                        eliminarCompra(item.product_type_id);
                                    }}
                                >Eliminar</button>
                            </td>
                        </tr>
                    ))}
                    <tr>
                        <th><b>TOTAL:</b></th>
                        <td>${calcularTotal()}</td>
          
                        <td colSpan="1"></td>
                        
                        <button 
                    className="btn btn-primary btn-comprar"
                    onClick={handleImpresion}
                    disabled={listaCompras.length < 1}
                >COMPRAR</button>
                    </tr>
                </tbody>
            </table>

           
        </>
    );
};
