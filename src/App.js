import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useUserContext } from "./Contexts";
import { routes } from "./Library/Routes";
import { HeaderPage } from "./Pages";
import { useEffect } from "react";
import './App.css';

function App() {
  const { logged, user, loadLoginInfo } = useUserContext();

  useEffect(() => {
    loadLoginInfo();
  }, []);

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
            <Redirect to={`/${user.name}/boards`} />
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
