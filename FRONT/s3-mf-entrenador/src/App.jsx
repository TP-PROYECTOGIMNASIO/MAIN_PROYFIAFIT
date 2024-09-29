import { useEffect } from "react";
import { Routes, Route, useNavigationType, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Inicio from "./pages/Inicio/Inicio";
import Visualizar from "./pages/VisualizarMetricasAlumno/VisualizarMetricasAlumno";
import ListarAlumnos from "./pages/VisualizarMetricasAlumno/ListarMetricas/ListaAlumnos";
import RegistrarMetricas from "./pages/RegistrarMetricasAlumno/registrarMetricas/RegistrarMetricasAlumno";
import AlumnoCheckin from "./pages/VisualizarMetricasAlumno/Checking-Metricas/AlumnoCheckin";
import VistaNoRegisrado from "./pages/RegistrarMetricasAlumno/VistaNoRegistradoMetricas/Ir-Registrar-Metrica";
import ListStudents from "./pages/listStudents/ListStudents";
import AsignarAlumno2 from "./pages/asignaralumno/AsignarAlumno2";
import Planes from "./pages/Planes";
import PlanEntrenamientoDia from "./pages/PlanEntrenamientoDia/PlanEntrenamientoDia.jsx"
import RegistrarEntrenamientoDia from "./pages/RegistrarEntrenamientoDia/RegistrarEntrenamientoDia.jsx";
import RegistroEntrenamiento from "./pages/RegistroEntrenamiento/RegistroEntrenamiento.jsx";
import TrainingPlan from "./pages/PlanEntrenamientoDia/TrainingPlan.jsx";
import TrainingPlanOk from "./pages/PlanEntrenamientoDia/TrainingPlanOk.jsx";
import AsignarAlumno3 from "./pages/asignaralumno/AsignarAlumno3";


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
        title = "Inicio";
        metaDescription = "Welcome to Fia Fit";
        break;
      case "/list-students":
        title = "Lista de Alumnos";
        metaDescription = "Lista de todos los alumnos registrados.";
        break;
      // Agrega casos adicionales si es necesario
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
      <Navbar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/visualizar" element={<Visualizar />} />
        <Route path="/listar-alumnos" element={<ListStudents />} />
        <Route path="/registrar-metricas" element={<RegistrarMetricas />} />
        <Route path="/alumno-checkin" element={<AlumnoCheckin />} />
        <Route path="/vista-no-registrado" element={<VistaNoRegisrado />} />
        <Route path="/asignar-alumno" element={<AsignarAlumno3 />} />
        <Route path="/planes" element={<Planes />} />
        <Route path="/PlanEntrenamientoDia" element={<PlanEntrenamientoDia />} />
        <Route path="/registrar-entrenamiento" element={<RegistrarEntrenamientoDia />} />
        <Route path="/registro-entrenamiento" element={<RegistroEntrenamiento />} />
        <Route path="/Trainingplan" element={<TrainingPlan />} />
        <Route path="/TrainingPlanOk" element={<TrainingPlanOk />} />
        {/* Agrega otras rutas aquí */}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
