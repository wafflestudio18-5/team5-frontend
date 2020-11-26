import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import SignUp from './Pages/SignUp/SignUp';
import Boards from './Pages/Boards/Boards';
import Board from './Pages/Board/Board';
import Card from './Pages/Card/Card';

const routes = {
  Home: { path: '/', component: Home },
  Login: { path: '/login', component: Login },
  SignUp: { path: '/signup', component: SignUp },
  Board: { path: '/b/:board_code/:board_name', component: Board },
  Card: { path: '/c/:card_code/:card_name', component: Card },
  Boards: { path: '/:user/boards', component: Boards }
}

export { routes };