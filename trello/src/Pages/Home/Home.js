import { Home } from '../../Components';
import { routes } from '../../Routes';

function HomePage() {
  return(
    <Home login={routes.Login} signup={routes.SignUp}/>
  )
}

export default HomePage;