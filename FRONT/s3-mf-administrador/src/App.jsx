import { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import HUVISUALLIZARINICIOSEGN from "./pages/HUVISUALLIZARINICIOSEGN";
import TipoProductos from "./pages/tipoProductos/tipoProductos";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import TipoEjercicios from "./pages/tipoEjercicios/tipoEjercicios";
import Lista_Productos from "../pages/Mantener_Productos/Lista_Productos";

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
    <>
      <Navbar/>
    <Routes>

      <Route path="/" element={<HUVISUALLIZARINICIOSEGN />} />
      <Route path="/tproductos" element={<TipoProductos />} />
      <Route path="/tejercicios" element={<TipoEjercicios />} />
      <Route path="/Lista_Productos" element={<Lista_Productos />} />

    </Routes>
    <Footer/>
    </>
  );
}
export default App;
