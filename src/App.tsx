import Home from "./pages/Home.tsx";
import About from "./pages/About.tsx";
import { Router } from "./components/Router.tsx";
import { RouteComponentProps } from "./types/index";

const routes = [
  { 
    path: "/", 
    Component: Home,
  },
  { 
    path: "/about", 
    Component: About
  },
  {
    path: "/about/:id",
    Component: ({routeParams}: RouteComponentProps) => <h1>{routeParams?.id}</h1>
  }
]



function App() {
  return (
    <>
      <Router routes={routes} />
    </>
  )
}

export default App
