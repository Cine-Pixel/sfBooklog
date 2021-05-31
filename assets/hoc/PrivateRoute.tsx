import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";

type Props = {
  token: string,
} & RouteProps;

const PrivateRoute: React.FC<Props> = ({ token, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      token !== "" ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/auth", state: { from: props.location } }}
        />
      )
    }
  />
);

export default PrivateRoute;
