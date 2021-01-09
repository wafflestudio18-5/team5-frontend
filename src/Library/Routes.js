import { HomePage, LoginPage, SignUpPage, BoardPage, CardPage, BoardsPage } from '../Pages';
import Home from '../Pages/Home/Home';
import Login from '../Pages/Login/Login';
import SignUp from '../Pages/SignUp/SignUp';
import Board from '../Pages/Board/Board';
import Boards from '../Pages/Boards/Boards';
import Card from '../Pages/Card/Card';

const routes = {
  Home: { path: '/', component: Home },
  Login: { path: '/login', component: Login },
  SignUp: { path: '/signup', component: SignUp },
  Board: { path: '/b/:board_key/:board_name', component: Board },
  Card: { path: '/c/:card_key/:card_name', component: Card },
  Boards: { path: '/:user/boards', component: Boards },

  HomePage: { path: '/', component: HomePage },
  LoginPage: { path: '/login', component: LoginPage },
  SignUpPage: { path: '/signup', component: SignUpPage },
  BoardPage: { path: '/b/:board_key/:board_name', component: BoardPage },
  CardPage: { path: '/c/:card_key/:card_name', component: CardPage },
  BoardsPage: { path: '/:user/boards', component: BoardsPage }
}

export { routes };