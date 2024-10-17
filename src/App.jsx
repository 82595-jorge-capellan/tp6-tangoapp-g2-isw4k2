import './App.css'
import './css/Main.css'
import Formulario from './components/Formulario'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element = {<Formulario/>}/>
        </Routes>
      </Router>
    </>)
}

export default App
