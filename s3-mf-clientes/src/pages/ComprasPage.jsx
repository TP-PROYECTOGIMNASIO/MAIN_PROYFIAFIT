import { useContext } from "react"
import { Card } from "../components/Card"
import { ProductosContext } from "../context/ProductosContext"
import { CarritoContext } from "../context/CarritoContext"

export const ComprasPage = () => {

    const { productos } = useContext( ProductosContext )

    const { agregarCompra, eliminarCompra } = useContext(CarritoContext)

    const handleAgregar = (compra) =>{
      agregarCompra(compra)
    }
    const handleQuitar = (product_type_id) =>{
      eliminarCompra(product_type_id)
    }
   

  return (
    <>
    <h1></h1>
    <h1 style={{color:"#FF0000" } } >Catálogo de</h1>
    <h1 style={{color:"#FF0000"}} >productos</h1>
    <h1></h1>
   
    

    {productos.map(producto => (
        <Card 
        key={producto.product_type_id}
        imagen={producto.image_url}
        titulo={producto.product_name}
        descripcion={producto.description}
        precio={producto.price}
        handleAgregar={() => handleAgregar(producto)}
        handleQuitar={() => handleQuitar(producto.product_type_id)}
        >

        </Card>
    ))}
    
    </>
  )
}
