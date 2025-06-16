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
import PrivateRoute from './Routes/PrivateRoute/PrivateRoute'
import DashboardLayout from './Pages/Dashboard/DashboardLayout'
import AllUsers from './Pages/Dashboard/AdminPages/AllUsers/AllUsers'
import AddProduct from './Pages/Dashboard/AdminPages/AddProduct/AddProduct'
import AllProducts from './Pages/Dashboard/AdminPages/AllProducts/AllProducts'
import AllOrders from './Pages/Dashboard/AdminPages/AllOrders/AllOrders'
import AdminRoute from './Routes/AdminRoute/AdminRoute';
import UserRoute from './Routes/UserRoute/UserRoute'
import MyOrders from './Pages/Dashboard/UserPages/MyOrders/MyOrders'
import MyCart from './Pages/Dashboard/UserPages/MyCart/MyCart'
import MyWishlist from './Pages/Dashboard/UserPages/MyWishlist/MyWishlist'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchSingleUser, userLogout } from './App/Features/User/userSlice'
import UpdateProduct from './Pages/Dashboard/AdminPages/UpdateProduct/UpdateProduct'
import DealsProduct from './Pages/Dashboard/AdminPages/DealsProduct/DealsProduct'
import UploadProfile from './Pages/Dashboard/UserPages/UploadProfile/UploadProfile'
import BestSeller from './Pages/BestSeller/BestSeller';
import NewArrivals from './Pages/NewArrivals/NewArrivals'
import Accessories from './Pages/Accessories/Accessories'
import Dashboard from './Pages/Dashboard/Dashboard'
import Order from './Pages/Dashboard/AdminPages/Order/Order'

function App() {
  const dispatch = useDispatch();


  useEffect(() => {
    const fetchUser = async () => {
      try {

        dispatch(fetchSingleUser())

      } catch (error) {
        dispatch(userLogout());
        console.error(error)
      }
    }
    fetchUser()

  }, [dispatch]);

  // console.log('userLists: ', userLists)

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<Product />} />

          {/* protected routes here  */}
          <Route element={<PrivateRoute />}>
            <Route path='/products/:id' element={<ProductDetails />} />
            <Route path='/cart/:userId' element={<Cart />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/best-seller' element={<BestSeller />} />
            <Route path='/new-arrivals' element={<NewArrivals />} />
            <Route path='/accessories' element={<Accessories />} />

            {/* dashboard  */}

            <Route path='/dashboard' element={<DashboardLayout />}>
            <Route index element={<Dashboard/>} />

              {/* admin routes  */}
              <Route path='admin/users' element={
                <AdminRoute>
                  <AllUsers />
                </AdminRoute>
              } />

              <Route path='admin/add-product' element={
                <AdminRoute>
                  <AddProduct />
                </AdminRoute>
              } />


              <Route path='admin/products' element={
                <AdminRoute>
                  <AllProducts />

                </AdminRoute>
              } />
              <Route path='admin/orders' element={
                <AdminRoute>
                  <AllOrders />

                </AdminRoute>
              } />
              <Route path='admin/order/:id' element={
                <AdminRoute>
                  <Order/>

                </AdminRoute>
              } />


              <Route path='admin/update/:id' element={
                <AdminRoute>
                  <UpdateProduct />
                </AdminRoute>
              } />
              <Route path='admin/deals' element={
                <AdminRoute>
                  <DealsProduct />

                </AdminRoute>
              } />




              {/* user routes  */}
              <Route path='user/upload-profile/:id' element={
                <UserRoute>
                  <UploadProfile />
                </UserRoute>
              } />

              <Route path='user/orders' element={
                <UserRoute>
                  <MyOrders />
                </UserRoute>
              } />

              <Route path='user/cart' element={
                <UserRoute>
                  <MyCart />
                </UserRoute>
              } />

              <Route path='user/wishlist' element={
                <UserRoute>
                  <MyWishlist />
                </UserRoute>
              } />


            </Route>
          </Route>


          {/* auth routes  */}
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forget-password' element={<ForgetPassword />} />
          <Route path='/confirmation-code/:userId' element={<ConfirmationCode />} />
          <Route path='/new-password/:userId/:otp' element={<NewPassword />} />

        </Routes>
        {/* footer component */}
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
