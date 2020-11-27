import { Boards } from '../../Components';
import { useUserContext } from '../../Contexts/User';
import { Header } from '../../Components/Header';

function BoardsPage({history}) {
  const { user } = useUserContext();
  const user_data = user.user_data;
  
  return(
    <div id="pageBoardPage">
      <Header user_data={user_data}/>
      <Boards user_data={user_data} history={history}/>
    </div>
  )
}

export default BoardsPage;