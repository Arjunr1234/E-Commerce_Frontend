import './App.css'
import {Route, Routes} from 'react-router-dom'
import SignIn from './pages/SignIn'
import Home from './pages/Home'
import ProtectedRoute from './utils/ProtectedRoute'
import Layout from './components/Layout'

function App() {
  

  return (
      <>
        <Routes>
           <Route path='/' element={<SignIn/>}/>
            <Route element={<ProtectedRoute/>}>
              <Route element={<Layout/>}>
                  <Route path='/dashboard' element={<Home/>}/>
              </Route>   
            </Route>
        </Routes>
     
      </>

  )
}

export default App
