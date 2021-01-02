import React from "react";
import { Route, Redirect } from "react-router-dom";
import { routes } from "../../Library/Routes";

const LoginPage = () => {
  return (
    <>
      <Route
        exact
        path={routes.Login.path}
        component={routes.Login.component}
      />
      <Redirect to="/login/" />
    </>
  );
};

export default LoginPage;
