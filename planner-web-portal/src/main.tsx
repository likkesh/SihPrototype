import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './context/AuthContext'
import { SharedDataProvider } from './context/SharedDataContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <SharedDataProvider>
        <App />
      </SharedDataProvider>
    </AuthProvider>
  </StrictMode>,
)
