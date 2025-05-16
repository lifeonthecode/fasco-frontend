import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Footer from './Components/Footer/Footer'
import Home from './Pages/Home/Home'
import Product from './Pages/Product/Product'
import Navbar from './Components/Navbar/Navbar'
import ProductDetails from './Pages/ProductDetails/ProductDetails'
import Cart from './Pages/Cart/Cart'
import Checkout from './Pages/Checkout/Checkout'

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<Product />} />
          <Route path='/products/:id' element={<ProductDetails />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout' element={<Checkout />} />
        </Routes>
        {/* footer component */}
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
