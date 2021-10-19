import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';


type PublicRouteProps  = {
    path: RouteProps['path'];
    component: React.ElementType;
    isAuthenticated: boolean;
    exact?: boolean | undefined;
};



export const PublicRoute: React.FunctionComponent<PublicRouteProps> = ({
   isAuthenticated,
   component: Component,
   ...routeProps
}) => {
    return (
        <Route 
            { ...routeProps }
            render={(props) =>
                !isAuthenticated
                ? <Component { ...props } />
                : <Redirect to="/" />
            }
        />
    );
};
