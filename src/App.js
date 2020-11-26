import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { UserProvider, useUserContext } from "./Contexts/User";
import { routes } from "./Routes";
import { HeaderPage } from "./Pages";

function App() {
  // TODO: 실행 전에 login되어 있는지 먼저 확인해야 함
  const { logged_in, logged_user_data } = useUserContext();

  if (logged_in) {
    return (
      <UserProvider>
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
      </UserProvider>
    );
  } else {
    return (
      <UserProvider>
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
      </UserProvider>
    );
  }
}

export default App;
