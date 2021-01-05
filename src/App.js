import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useUserContext } from "./Contexts";
import { routes } from "./Library/Routes";
import { HeaderPage } from "./Pages";
import { useEffect, useState } from "react";

function App() {
  const { logged, user, loadLoginInfo, fetchUserList } = useUserContext();

  useEffect(() => {
    loadLoginInfo();
  }, []);

  console.log("App render");

  return (
    <BrowserRouter>
      {logged ? (
        <>
          <HeaderPage user_data={user} />
          <Switch>
            <Route
              path={routes.BoardsPage.path}
              component={routes.BoardsPage.component}
            />
            <Route
              path={routes.BoardPage.path}
              component={routes.BoardPage.component}
            />
            <Route
              path={routes.CardPage.path}
              component={routes.CardPage.component}
            />
            <Redirect to="/username/boards" />
          </Switch>{" "}
        </>
      ) : (
        <>
          {" "}
          <Switch>
            <Route
              path={routes.LoginPage.path}
              component={routes.LoginPage.component}
            />
            <Route
              path={routes.SignUpPage.path}
              component={routes.SignUpPage.component}
            />
            <Route
              path={routes.HomePage.path}
              component={routes.HomePage.component}
            />
          </Switch>{" "}
        </>
      )}
    </BrowserRouter>
  );
}

export default App;
