<<<<<<< HEAD
<<<<<<< HEAD
import './App.css'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Sedes from './pages/Sedes'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sedes" element={
          <>
            <Navbar/>
            <Sedes />
            <Footer/>
          </>
          } />
      </Routes>
    </Router>
  )
=======
import { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import HUVISUALLIZARINICIOSEGN from "./pages/HUVISUALLIZARINICIOSEGN";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<HUVISUALLIZARINICIOSEGN />} />
    </Routes>
  );
>>>>>>> origin/s3-mf-clientes/HU-TP-17
}
=======

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


import InformePrincipal from "./components/InformePrincipal";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Informe-Compra" element={<InformePrincipal />} />
      </Routes>
    </Router>
  );
}

>>>>>>> origin/s3-mf-manager/HU-TP-61
export default App;
