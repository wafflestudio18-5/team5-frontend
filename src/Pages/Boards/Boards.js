import { useEffect, useState } from 'react';
import { Boards } from '../../Components';
import { useUserContext } from '../../Contexts';
import { get, post } from '../../Server';

function BoardsPage({history}) {
  const { user } = useUserContext();
  const [ boards, setBoards ] = useState([]);

  const fetchBoards = async () => {
    const brds = await get('/api/v1/board/boardlist', null);
    setBoards(brds);
  }

  const postBoard = async (name) => {
    if(!name) return;
    await post('/api/v1/board', {name: name});
    fetchBoards();
  }
  
  useEffect(() => {
    fetchBoards();
  }, [])
  
  const personal = boards;
  const starred = boards;
  const recent = boards;

  return(
    <>
      <Boards user_data={user} personal={personal} starred={starred} recent={recent} postBoard={postBoard}/>
    </>
  )
}

export default BoardsPage;