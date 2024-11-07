import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Routes,Route } from "react-router-dom";
import './index.css'

import HUVISUALLIZARINICIOSEGN from './pages/HUVISUALLIZARINICIOSEGN';
import Eventos from './pages/Eventos.jsx';
import NuevoEvento from './pages/NuevoEvento/NuevoEvento.jsx';
import RegistrarEvento from './pages/NuevoEvento/RegistrarEvento.jsx';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {

  return (
    <>
      <Router>
        <>
        <Navbar/>
        <Routes>
          <Route  path="/" element={<HUVISUALLIZARINICIOSEGN />} />
          <Route  path="/eventos" element={<Eventos />} />
          <Route  path="/nuevo_evento" element={<NuevoEvento />} />
          <Route  path="/registrar_evento" element={<RegistrarEvento />} />

        </Routes>
        <Footer/>
        </>

      </Router>

    </>
  )
}
export default App
