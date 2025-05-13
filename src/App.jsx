import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Footer from './Components/Footer/Footer'
import Home from './Pages/Home/Home'
import Product from './Pages/Product/Product'

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/'element={<Home/>} />
        <Route path='/products' element={<Product/>} />
      </Routes>
        {/* footer component */}
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
