import { useEffect, useState } from "react";
import { NAVIGATION_EVENTS } from "./consts";
import { RouterProps } from "./types";

function Default() {
    return <h1>404</h1>
}

export function Router({ routes, DefaultComponent = Default }: RouterProps) {
    const [currPathName, setCurrPathName] = useState(window.location.pathname);

    useEffect(() => {
        const onLocationChange = (): void => {
            setCurrPathName(window.location.pathname);
        };

        window.addEventListener(NAVIGATION_EVENTS.PUSHSTATE, onLocationChange);
        window.addEventListener(NAVIGATION_EVENTS.POPSTATE, onLocationChange);

        return () => {
            window.removeEventListener(NAVIGATION_EVENTS.PUSHSTATE, onLocationChange);
            window.removeEventListener(NAVIGATION_EVENTS.POPSTATE, onLocationChange);
        };
    }, []);

    const CurrComponent = routes.find((route) =>
        route.path === currPathName ? route.Component : null
    )?.Component;

    return CurrComponent ? <CurrComponent /> : <DefaultComponent />;
}
