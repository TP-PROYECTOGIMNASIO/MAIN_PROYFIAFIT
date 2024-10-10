import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Routes,Route } from "react-router-dom";
import './index.css'

import HUVISUALLIZARINICIOSEGN from './pages/HUVISUALLIZARINICIOSEGN';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route  path="/" element={<HUVISUALLIZARINICIOSEGN />} />

        </Routes>
      </Router>

    </>
  )
}

export default App
