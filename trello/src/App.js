import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { routes } from './Routes';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={routes.Login.path} component={routes.Login.component}/>
        <Route path={routes.SignUp.path} component={routes.SignUp.component}/>
        <Route path={routes.Home.path} component={routes.Home.component}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
