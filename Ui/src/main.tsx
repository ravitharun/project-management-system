import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import FeatMaintenance from './Components/FeatMaintance.tsx'

createRoot(document.getElementById('root')!).render(
  <FeatMaintenance>
    <App />
  </FeatMaintenance>,
)
