import React, { useEffect, useState } from "react";
import { NAVIGATION_EVENTS } from "../consts";
import { Route } from "../types";
import { match } from "path-to-regexp";
import { RouteComponentProps } from "../types";

interface RouterProps {
    routes: Route[],
    DefaultComponent?: React.FC<RouteComponentProps>
}

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

    let routeParams = {}

    const CurrComponent: React.FC<RouteComponentProps> | undefined = routes.find(({ path }) => {
        if (path === currPathName) return true
        
        const matcherURL = match(path, { decode: decodeURIComponent })
        const matched = matcherURL(currPathName)
        
        if (!matched) return false

        routeParams = matched.params
        return true
    })?.Component;

    return CurrComponent ? <CurrComponent routeParams={routeParams} /> : <DefaultComponent />;
}
