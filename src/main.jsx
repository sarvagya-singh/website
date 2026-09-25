import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// The site used hash URLs (/#/about) before; keep those links working.
if (window.location.hash.startsWith('#/')) window.history.replaceState(null, '', window.location.hash.slice(1))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
