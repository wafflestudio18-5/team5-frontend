import { Boards } from '../../Components';
import { useUserContext } from '../../Contexts/User';

function BoardsPage() {
  const { user } = useUserContext();
  
  return(
    <div id="pageBoardPage">
      <Header user_data={user_data} history={history}/>
      <Boards user_data={user_data} history={history}/>
    </div>
  )
}

export default BoardsPage;