import React from "react";
import { Redirect, Route } from "react-router-dom";
import { routes } from "../../Library/Routes";

const HomePage = () => {
  return (
    <>
      <Route exact path={routes.Home.path} component={routes.Home.component} />
      <Redirect to="/" />
    </>
  );
};

export default HomePage;
