import Home from "./pages/Home.tsx";
import About from "./pages/About.tsx";
import { Router } from "./Router.tsx";

const routes = [
  { 
    path: "/", 
    Component: Home,
  },
  { 
    path: "/about", 
    Component: About
  },
]



function App() {
  return (
    <>
      <Router routes={routes} />
    </>
  )
}

export default App
