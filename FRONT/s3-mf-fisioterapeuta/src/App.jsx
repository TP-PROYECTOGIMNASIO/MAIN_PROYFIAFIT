import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css'

import HUVISUALLIZARINICIOSEGN from './pages/HUVISUALLIZARINICIOSEGN';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ListaClientes from "./pages/ListaClientes/ListaClientes";
import ListaEjercicios from "./pages/MantenerListaEjercicios/ListaEjercicios";
import ListaTipoEjercicios from "./pages/MantenerListaEjercicios/ListaTipoEjerciciosTratamiento";
function App() {
  return (
    <>
      <Router>
        <>
        <Navbar/>
        <Routes>
          <Route  path="/" element={<HUVISUALLIZARINICIOSEGN />} />
          <Route  path="/listar-clientes" element={<ListaClientes />} />
          <Route  path="/ListaEjercicios" element={<ListaEjercicios />} />
          <Route  path="/tipos-ejercicio" element={<ListaTipoEjercicios />} />
        </Routes>
        <Footer/>
        </>
      </Router>
    </>
  )
}

export default App;
