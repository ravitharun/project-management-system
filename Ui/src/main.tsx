import { createRoot } from 'react-dom/client'
import './index.css'
import FeatMaintenance from './Components/FeatMaintance.tsx'
import AppRouter from './Routes/AppRouter.tsx'

createRoot(document.getElementById('root')!).render(
  <FeatMaintenance>
    <AppRouter />
  </FeatMaintenance>,
)
