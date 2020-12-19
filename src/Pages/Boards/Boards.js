import { useState } from 'react';
import { Boards } from '../../Components';
import { useUserContext } from '../../Contexts';
import { get } from '../../Server';

function BoardsPage({history}) {
  const { user } = useUserContext();
  const [ boards, setBoards ] = useState([]);

  const fetchBoards = async () => {
    const brds = await get('/api/v1/board/boardlist');
    setBoards(brds);
  }
  
  fetchBoards();
  const personal = boards;
  const starred = boards;
  const recent = boards;

  return(
    <>
      <Boards user_data={user} personal={personal} starred={starred} recent={recent}/>
    </>
  )
}

export default BoardsPage;