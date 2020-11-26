import { Boards } from '../../Components';
import { useUserContext } from '../../Contexts/User';

function BoardsPage() {
  const { user } = useUserContext();
  
  return(
    <>
      <Boards user_data={user}/>
    </>
  )
}

export default BoardsPage;