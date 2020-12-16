import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useUserContext } from "../../Contexts/User";
import { routes } from "../../Routes";

const BoardsPage = () => {
  const { user } = useUserContext();
  const path = `/${user.username}/boards/`;
  console.log(path);
  return (
    <>
      <Route exact path={path} component={routes.Boards.component} />
      <Redirect to={path} />
    </>
  );
};

export default BoardsPage;
