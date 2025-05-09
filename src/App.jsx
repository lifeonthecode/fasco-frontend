import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Footer from './Components/Footer/Footer'
import Home from './Pages/Home/Home'

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/'element={<Home/>} />
      </Routes>
        {/* footer component */}
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
