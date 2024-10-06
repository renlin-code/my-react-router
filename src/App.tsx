import { lazy, Suspense } from "react";
import { Router } from "./components/Router.tsx";
import { IRouteComponentProps } from "./types/index";
import { Route } from "./components/Route.tsx";

const Home = lazy(() => import("./pages/Home.tsx"));
const About = lazy(() => import("./pages/About.tsx"));


const routes = [
  // {
  //   path: "/",
  //   Component: Home,
  // },
  // {
  //   path: "/about",
  //   Component: About
  // },
  {
    path: "/about/:id",
    Component: ({ routeParams }: IRouteComponentProps) => <h1>{routeParams?.id}</h1>
  }
]



function App() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Router routes={routes}>
          <Route path="/" Component={Home} />
          <Route path="/about" Component={About} />
        </Router>
      </Suspense>
    </>
  )
}

export default App
