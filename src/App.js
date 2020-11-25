import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { routes } from './Routes';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={routes.Boards.path} component={routes.Boards.component} exact={true}/>
        <Route path={routes.Login.path} component={routes.Login.component} exact={true}/>
        <Route path={routes.SignUp.path} component={routes.SignUp.component} exact={true}/>
        <Route path={routes.Home.path} component={routes.Home.component} exact={true}/>
        <Route path={routes.Board.path} component={routes.Board.component} exact={true}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
