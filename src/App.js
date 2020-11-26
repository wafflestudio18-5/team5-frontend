import { BrowserRouter, Switch, Route } from "react-router-dom";
import { routes } from "./Routes";
import { Header } from './Pages';

function App() {
  // TODO: 원래는 로그인하면 ~~되게 백엔드랑 이케이케 해서 결정해야 함
  const logged_in = false;
  const logged_user_data = {
    name: 'mina',

  }

  if (logged_in) {
    return (
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path={routes.Boards.path} component={routes.Boards.component} />
          <Route path={routes.Board.path} component={routes.Board.component} />
          <Route path={routes.Card.path} component={routes.Card.component} />
        </Switch>
      </BrowserRouter>
    );
  } else {
    return (
      <BrowserRouter>
        <Switch>
          <Route path={routes.Login.path} component={routes.Login.component} />
          <Route path={routes.SignUp.path} component={routes.SignUp.component} />
          <Route path={routes.Home.path} component={routes.Home.component} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
