import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { contexts, AppProvider, useUserContext } from "./Contexts";
import { routes } from "./Routes";
import { HeaderPage } from "./Pages";
import { useEffect } from "react";


function App() {
  const { logged_in, logged_user_data, loadLoginInfo } = useUserContext();


  useEffect(() => {
    loadLoginInfo();
  }, []);


  if (logged_in) {
    return (
      <AppProvider contexts={contexts}>
        <BrowserRouter>
          <HeaderPage user_data={logged_user_data} />
          <Switch>
            <Route
              path={routes.BoardsPage.path}
              component={routes.BoardsPage.component}
            />
            <Route
              path={routes.BoardPage.path}
              component={routes.BoardPage.component}
            />
            <Route path={routes.CardPage.path} component={routes.CardPage.component} />
            <Redirect to='/username/boards'/>
          </Switch>
        </BrowserRouter>
        </AppProvider>
    );
  } else {
    return (
      <AppProvider contexts = {contexts}>
        <BrowserRouter>
          <Switch>
            <Route
              path={routes.LoginPage.path}
              component={routes.LoginPage.component}
            />
            <Route
              path={routes.SignUpPage.path}
              component={routes.SignUpPage.component}
            />
            <Route path={routes.HomePage.path} component={routes.HomePage.component} />
          </Switch>
        </BrowserRouter>
      </AppProvider>
    );
  }
}

export default App;
