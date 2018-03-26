import React from "react";
import { Redirect, Route } from "react-router-dom";

const AuthRoute = function (props) {

    const {
        component: Component,
        isAuthenticated = false,
        ...otherProps
    } = props;

    return (
        <Route
            {...otherProps}
            render={props => (
                (isAuthenticated)
                    ? <Component {...props} />
                    : <Redirect to="/sign_in" />
            )}
        />
    );
};

export default AuthRoute;
