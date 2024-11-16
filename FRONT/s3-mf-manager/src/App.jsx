import { useEffect } from "react";
import { Routes, Route, useNavigationType, useLocation } from "react-router-dom";
import HUVISUALLIZARINICIOSEGN from "./pages/HUVISUALLIZARINICIOSEGN";
import EmployeeList from "./components/EmployeeList/EmployeeList";
import Navbar from "./components/Navbar";
import Sedes from "./pages/sedes/Sedes";
import RegistrarSedes from "./pages/sedes/RegistrarSedes";
import Footer from "./components/Footer";
import InformePrincipal from "./pages/visualizarInforme/InformePrincipal";
import RegistrarCompra from "./components/RegistrarCompra/RegistrarCompra";
import InventarioSedeP from "./pages/inventario/InventarioSedeP";
import ProductoSedeI from "./components/InventarioSede/ProductoSedeI";
import Tipodeproducto from "./pages/inventario/Tipodeproducto";
import ActualizarInventarioSedes from "./pages/inventario/ActualizarInventarioSedes";
import GenerarNuevoInventario from "./pages/inventario/GenerarNuevoInventario";
import MemberPage from "./pages/membresias/MembershipPage";

function Layout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action]);

  useEffect(() => {
    const titles = {
      "/": "Inicio",
      "/empleados": "Lista de Empleados",
      "/sedes": "Sedes",
      "/membresias": "Membresías",
      "/GenerarTipoProducto": "Tipo de Producto",
      "/ActualizarInventarioSedes": "Actualizar Inventario",
      "/GenerarNuevoInventario": "Nuevo Inventario",
    };

    const metaDescriptions = {
      "/": "Descripción de la página de inicio",
      "/empleados": "Lista de empleados de la empresa",
      "/sedes": "Información sobre las sedes",
      "/membresias": "Página de membresías",
      "/GenerarTipoProducto": "Página para generar un nuevo tipo de producto",
      "/ActualizarInventarioSedes": "Actualizar inventarios por sedes",
      "/GenerarNuevoInventario": "Generar un nuevo inventario",
    };

    const title = titles[pathname] || "App";
    const metaDescription = metaDescriptions[pathname] || "Descripción por defecto";

    document.title = title;
    const metaDescriptionTag = document.querySelector('meta[name="description"]');
    if (metaDescriptionTag) {
      metaDescriptionTag.content = metaDescription;
    }
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<Layout><HUVISUALLIZARINICIOSEGN /></Layout>} />
      <Route path="/empleados" element={<Layout><EmployeeList /></Layout>} />
      <Route path="/sedes" element={<Layout><Sedes /></Layout>} />
      <Route path="/registrar-sedes" element={<Layout><RegistrarSedes /></Layout>} />
      <Route path="/membresias" element={<Layout><MemberPage /></Layout>} />
      <Route path="/GenerarTipoProducto" element={<Layout><Tipodeproducto /></Layout>} />
      <Route path="/ActualizarInventarioSedes" element={<Layout><ActualizarInventarioSedes /></Layout>} />
      <Route path="/GenerarNuevoInventario" element={<Layout><GenerarNuevoInventario /></Layout>} />
      <Route path="/Inventario-Sede" element={<Layout><InventarioSedeP /></Layout>} />
      <Route path="/Inventario-Sede/Producto-Sede/:locationId" element={<Layout><ProductoSedeI /></Layout>} />
      <Route path="/Informe-Compra" element={<Layout><InformePrincipal /></Layout>} />
      <Route path="/Informe-Compra/Registrar-Compra" element={<Layout><RegistrarCompra /></Layout>} />
    </Routes>
  );
}

export default App;