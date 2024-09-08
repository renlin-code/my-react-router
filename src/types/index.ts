import { ComponentType } from "react";


export type Route = {
    path: string
    Component: ComponentType
}

export type RouterProps = {
    routes: Route[],
    DefaultComponent?: ComponentType
}
