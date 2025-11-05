import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './site/styles/base.less'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
