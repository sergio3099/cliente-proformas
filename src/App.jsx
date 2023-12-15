import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Menu from './components/ResponsiveAppBar'

function App() {


  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Menu />} />
        </Routes>
      </BrowserRouter>
      <h1>Hola mundo</h1>
    </div>

  )
}

export default App
