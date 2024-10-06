export interface Route {
    path: string
    Component: React.FC<RouteComponentProps>
}

export interface RouteComponentProps {
    routeParams?: Record<string, string>
}