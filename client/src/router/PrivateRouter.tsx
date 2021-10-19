import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';


type PrivateRouteProps  = {
    path: RouteProps['path'];
    component: React.ElementType;
    isAuthenticated: boolean;
    exact?: boolean | undefined;
};



export const PrivateRoute: React.FunctionComponent<PrivateRouteProps> = ({
   isAuthenticated,
   component: Component,
   ...routeProps
}) => {
    return (
        <Route 
            { ...routeProps }
            render={(props) =>
                isAuthenticated
                ? <Component { ...props } />
                : <Redirect to="/auth" />
            }
        />
    );
};
