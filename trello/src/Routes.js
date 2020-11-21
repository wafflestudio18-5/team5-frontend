import { Home, Login, SignUp } from './Pages';

const routes = {
  Home: { path: '/', component: Home },
  Login: { path: '/login', component: Login },
  SignUp: { path: '/signup', component: SignUp }
}

export { routes };