import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ContextApi from './contextApi/ContextApi.jsx'
import AuthContext from './contextApi/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContext>
      <ContextApi>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ContextApi>
    </AuthContext>
  </StrictMode>,
)
