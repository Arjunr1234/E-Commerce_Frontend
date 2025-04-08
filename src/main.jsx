import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import {Toaster} from 'sonner'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <Toaster position='top-center' richColors/>
      <AuthProvider>
           <App />
     </AuthProvider>
    </BrowserRouter>
 
)
