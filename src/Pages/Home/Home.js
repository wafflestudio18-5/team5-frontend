import { Home } from '../../Components';
import { routes } from '../../Library/Routes';

function HomePage() {
  return(
    <Home login={routes.Login} signup={routes.SignUp}/>
  )
}

export default HomePage;