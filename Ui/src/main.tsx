import { createRoot } from 'react-dom/client'
import './index.css'
import FeatMaintenance from './Components/FeatMaintance.tsx'
import AppRouter from './Routes/AppRouter.tsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
    <FeatMaintenance>
      
      <AppRouter />
    </FeatMaintenance>,
    </BrowserRouter>
)
