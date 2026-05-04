import { checkuser } from "./Components/LocalStorage"
import Dashboard from "./pages/homePages/Dashboard"



function App() {
  checkuser()
  return (
    <>


      <Dashboard></Dashboard>
    </>
  )
}

export default App