import Header from '../Header/Header';
import { Board } from '../../Components';

//  Board: { path: '/b/:board_code/:board_name', component: Board }

const get_board_data = (board_code, board_name) => {
  // TODO: 백에서 board code와 board name을 이용해 board 데이터를 불러와야 한다.
  return {
    name: board_name,
    code: board_code,
    // TODO
  }
}

function BoardPage({ history, match }) {

  const board_code = match.params.board_code;
  const board_name = match.params.board_name;
  const board_data = get_board_data(board_code, board_name);
  const user_data = {name: "yujin"}; // TODO

  return(
    <>
      <Header user_data={user_data} history={history}/>
      <Board data={board_data}/>
    </>
  )
}

export default BoardPage;