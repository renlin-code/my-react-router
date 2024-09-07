import { useEffect, useState } from "react";
import { NAVIGATION_EVENTS } from "./consts";
import Home from "./pages/Home.tsx";
import About from "./pages/About.tsx";


function App() {
  const [currPathName, setCurrPathName] = useState(window.location.pathname)

  useEffect(() => {
    const onLocationChange = (): void => {
      setCurrPathName(window.location.pathname)
    }

    window.addEventListener(NAVIGATION_EVENTS.PUSHSTATE, onLocationChange)
    window.addEventListener(NAVIGATION_EVENTS.POPSTATE, onLocationChange)

    return () => {
      window.removeEventListener(NAVIGATION_EVENTS.PUSHSTATE, onLocationChange)
      window.removeEventListener(NAVIGATION_EVENTS.POPSTATE, onLocationChange)
    }
  }, [])

  return (
    <>
      { currPathName === "/" && <Home /> }
      { currPathName === "/about" && <About /> }
    </>
  )
}

export default App
