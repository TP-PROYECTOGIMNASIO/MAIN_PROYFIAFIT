import { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import HUVISUALLIZARINICIOSEGN from "./pages/HUVISUALLIZARINICIOSEGN";
import EmployeeList from "./components/EmployeeList/EmployeeList";
import Navbar from "./components/Navbar";
import Sedes from "./pages/sedes/Sedes";
import Footer from "./components/Footer";
import InformePrincipal from "./pages/visualizarInforme/InformePrincipal";

import Tipodeproducto from "./pages/inventario/Tipodeproducto";
import ActualizarInventarioSedes from "./pages/inventario/ActualizarInventarioSedes";
import GenerarNuevoInventario from "./pages/inventario/GenerarNuevoInventario";
import MemberPage from "./pages/membresias/MemberPage";


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
      <Route path="/" element={
        <>
          <Navbar />
          <HUVISUALLIZARINICIOSEGN />
          <Footer/>
        </>
      } />
      <Route path="/empleados" element={
        <>
          <Navbar />
          <EmployeeList />
          <Footer/>
        </>
      } />
      <Route path="/sedes" element={
        <>
          <Navbar />
          <Sedes />
          <Footer/>
        </>

        
      } />
      <Route path="/Informe-Compra" element={<InformePrincipal />} />
      <Route path="/membresias" element={
        <>
          <Navbar />
          <MemberPage />
          <Footer/>
        </>

      
      } />
      <Route path="/GenerarTipoProducto" element={
        <>
          <Navbar />
          <Tipodeproducto />
          <Footer/>
        </>
      } />
      <Route path="/ActualizarInventarioSedes" element={
        <>
          <Navbar />
          <ActualizarInventarioSedes />
          <Footer/>
        </>

        } />
      <Route path="/GenerarNuevoInventario" element={
        <>
          <Navbar />
            <GenerarNuevoInventario/>
          <Footer/>
        </>
      } />
    </Routes>
  );
}
export default App;
