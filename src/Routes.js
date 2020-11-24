import { Home, Login, SignUp, Boards } from './Pages';

const routes = {
  Home: { path: '/', component: Home },
  Login: { path: '/login', component: Login },
  SignUp: { path: '/signup', component: SignUp },
  Boards: { path: '/:user/boards', component: Boards }
}

export { routes };