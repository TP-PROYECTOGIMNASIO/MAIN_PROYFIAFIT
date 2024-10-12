import { useEffect } from "react";
import { Routes, Route, useNavigationType, useLocation } from "react-router-dom";
import HUVISUALLIZARINICIOSEGN from "./pages/HUVISUALLIZARINICIOSEGN";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

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
    let title = "Inicio";
    let metaDescription = "Bienvenido a la página de HUVISUALLIZARINICIOSEGN.";

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector('head > meta[name="description"]');
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      } else {
        const newMetaTag = document.createElement("meta");
        newMetaTag.name = "description";
        newMetaTag.content = metaDescription;
        document.head.appendChild(newMetaTag);
      }
    }
  }, [pathname]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HUVISUALLIZARINICIOSEGN />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
