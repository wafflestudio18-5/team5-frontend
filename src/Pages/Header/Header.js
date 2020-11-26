import { Header } from '../../Components';
import { useUserContext } from '../../Contexts/User';

function HeaderPage() {
  const { user } = useUserContext();

  return (
    <Header user_data={user}/> 
  )
}

export default HeaderPage;