export interface IRoute {
    path: string
    Component: React.FC<RouteComponentProps>
}

export interface IRouteComponentProps {
    routeParams?: Record<string, string>
}