import { Boards } from '../../Components';
import { useBoardListContext, useUserContext } from '../../Contexts';

function BoardsPage({history}) {
  const { user } = useUserContext();
  const { getPersonalBoards, getRecentBoards, getStarredBoards } = useBoardListContext();
  
  const personal = getPersonalBoards();
  const recent = getRecentBoards();
  const starred = getStarredBoards();

  return(
    <>
      <Boards user_data={user} personal={personal} starred={starred} recent={recent}/>
    </>
  )
}

export default BoardsPage;