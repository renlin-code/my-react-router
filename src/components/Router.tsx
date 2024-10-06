import React, { Children, useEffect, useState } from "react";
import { NAVIGATION_EVENTS } from "../consts";
import { IRoute } from "../types";
import { match } from "path-to-regexp";
import { IRouteComponentProps } from "../types";

interface RouterProps {
    children: React.ReactNode,
    routes: IRoute[],
    DefaultComponent?: React.FC<IRouteComponentProps>
}

function Default() {
    return <h1>404</h1>
}

export function Router({ children, routes = [], DefaultComponent = Default }: RouterProps) {
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

    const routesFromChildren = Children.map(children, (child) => {
        if (!React.isValidElement(child)) {
            return null;
        }
        const { type, props } = child;
        const { name } = type as { name: string };
        const isRoute = name === "Route";

        return isRoute ? props : null;
    })

    const allRoutes = routesFromChildren ? [...routesFromChildren, ...routes] : routes;

    const CurrComponent: React.FC<IRouteComponentProps> | undefined = allRoutes.find(({ path }) => {
        if (path === currPathName) return true
        
        const matcherURL = match(path, { decode: decodeURIComponent })
        const matched = matcherURL(currPathName)
        
        if (!matched) return false

        routeParams = matched.params
        return true
    })?.Component;

    return CurrComponent ? <CurrComponent routeParams={routeParams} /> : <DefaultComponent />;
}
