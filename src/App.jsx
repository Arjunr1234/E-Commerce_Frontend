import './App.css'
import {Route, Routes} from 'react-router-dom'
import SignIn from './pages/SignIn'
import Home from './pages/Home'
import Customers from './pages/Customers'
import Orders from './pages/Orders'
import Products from './pages/Products'
import Report from './pages/Report'
import ProtectedRoute from './utils/ProtectedRoute'
import Layout from './components/Layout'
import ViewOrder from './components/ViewOrder'
import NotFound from './components/NotFound'

function App() {
  

  return (
      <>
        <Routes>
           <Route path='/' element={<SignIn/>}/>
            <Route element={<ProtectedRoute/>}>
              <Route element={<Layout/>}>
                  <Route path='/dashboard' element={<Home/>}/>
                  <Route path='/products' element={<Products/>} />
                  <Route path='/customers' element={<Customers/>}/>
                  <Route path='/orders' element={<Orders/>} />
                  <Route path='/report' element={<Report/>}/>
                  <Route path='/view-order' element={<ViewOrder/>}/>
              </Route>   
            </Route>
            <Route path='*' element={<NotFound/>} />
        </Routes>
     
      </>

  )
}

export default App
