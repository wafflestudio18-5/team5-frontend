import { Boards } from '../../Components';
import { useBoardListContext, useUserContext } from '../../Contexts';

function BoardsPage({history}) {
  const { user } = useUserContext();
  const { get_personal_boards, get_recent_boards, get_starred_boards } = useBoardListContext();
  
  const personal = get_personal_boards();
  const recent = get_recent_boards();
  const starred = get_starred_boards();

  return(
    <>
      <Boards user_data={user} personal={personal} starred={starred} recent={recent}/>
    </>
  )
}

export default BoardsPage;