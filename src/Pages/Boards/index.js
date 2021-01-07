import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useUserContext } from "../../Contexts/User";
import { routes } from "../../Library/Routes";

const BoardsPage = () => {
  const { user } = useUserContext();
  if(!user) return null;
  const path = `/${user.username}/boards/`;
  return (
    <>
      <Route exact path={path} component={routes.Boards.component} />
      <Redirect to={path} />
    </>
  );
};

export default BoardsPage;
