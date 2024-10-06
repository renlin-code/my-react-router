import Home from "./pages/Home.tsx";
import About from "./pages/About.tsx";
import { Router } from "./components/Router.tsx";
import { IRouteComponentProps } from "./types/index";
import { Route } from "./components/Route.tsx";

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
    Component: ({routeParams}: IRouteComponentProps) => <h1>{routeParams?.id}</h1>
  }
]



function App() {
  return (
    <>
      <Router routes={routes}>
        <Route path="/" Component={Home} />
        <Route path="/about" Component={About} />
      </Router>
    </>
  )
}

export default App
