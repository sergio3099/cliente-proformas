import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Menu from './components/ResponsiveAppBar';
import { useAuth0 } from '@auth0/auth0-react';
import LandingPages from './pages/LandingPage';
import HomePage from './components/HomePage';
import ProductoList from './components/ProductoList'
import ProductoForm from './components/ProductoForm'
import VidrioList from './components/VidrioList'
import VidrioForm from './components/VidrioForm'
import AluminioList from './components/AluminioList'
import AluminioForm from './components/AluminioForm'
import Cotization from './pages/Cotization'
import Select from './components/Select'
import ProformaLista from './components/ProformasLista'

function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <div>
      <BrowserRouter>
        <Menu />
        <Routes>
          {/* Ruta por defecto: redirige a /home si está autenticado */}
          {isAuthenticated ? (
            <Route path="/" element={<Navigate to="/home" replace />} />
          ) : (
            <Route path="/" element={<LandingPages />} />
            )}
          {
            isAuthenticated? (
              
              <Route path="/home" element={<Cotization />} />
              ):(
                <Route path="/home" element={<Navigate to='/' replace/>} />
                
                )
              }
              <Route path="/producto" element={<ProductoList />} />
              <Route path="/nuevo-producto" element={<ProductoForm />} />
              <Route path="/:id/editar-producto" element={<ProductoForm />} />
              <Route path="/vidrio" element={<VidrioList />} />
              <Route path="/nuevo-vidrio" element={<VidrioForm />} />
              <Route path="/:id/editar-vidrio" element={<VidrioForm />} />
              <Route path="/aluminio" element={<AluminioList />} />
              <Route path="/nuevo-aluminio" element={<AluminioForm />} />
              <Route path="/:id/editar-aluminio" element={<AluminioForm />} />
              <Route path='/select' element={<Select />}/>
              <Route path="/proformas" element={<ProformaLista />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;