import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Admin from './pages/Admin'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar />
        <main className="page-shell">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/produit/:id" element={<ProductDetail />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
