import AddProductButton from '../../components/AddProductButton';
import ProductTable from '../../components/ProductTable';
import logo from '../../assets/Logo.png'
import { Link } from "react-router-dom";

import './styles.css';


export default function TipoProductos(){
    return(
        <div className="app-container">
{/*
            <div className="main-content">
            <h1 className="page-title">TIPOS DE PRODUCTOS</h1>
            <div className="top-buttons">
                <Link to={"/"} className="back-link">← Regresar</Link>
                <AddProductButton />
            </div>
            <div className="search-container">
                <input type="text" placeholder="Buscar..." />
            </div>
            </div>*/}
            <ProductTable />
        </div>
    )
}