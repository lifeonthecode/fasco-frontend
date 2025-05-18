import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Footer from './Components/Footer/Footer'
import Home from './Pages/Home/Home'
import Product from './Pages/Product/Product'
import Navbar from './Components/Navbar/Navbar'
import ProductDetails from './Pages/ProductDetails/ProductDetails'
import Cart from './Pages/Cart/Cart'
import Checkout from './Pages/Checkout/Checkout'
import ForgetPassword from './Pages/Auth/ForgetPassword/ForgetPassword'
import Register from './Pages/Auth/Register/Register'
import Login from './Pages/Auth/Login/Login'
import ConfirmationCode from './Pages/Auth/ConfirmationCode/ConfirmationCode'
import NewPassword from './Pages/Auth/NewPassword/NewPassword'

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

          {/* auth routes  */}
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/forget-password' element={<ForgetPassword/>} />
          <Route path='/confirmation-code' element={<ConfirmationCode/>} />
          <Route path='/new-password' element={<NewPassword/>} />

        </Routes>
        {/* footer component */}
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
