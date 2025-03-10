// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { SocketContextProvider } from './context/SocketContext.jsx'
// import { AuthContext, AuthContextProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  // <AuthContextProvider>
  <SocketContextProvider>
    <App />
    </SocketContextProvider>
    // </AuthContextProvider>
  // </StrictMode>,
)
