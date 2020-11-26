import { Boards } from '../../Components';

const get_user_data = (user_name) => {
  // TODO: 백에서 user name을 이용해 board list를 불러와야 한다.
  return {
    name: user_name,
    // TODO
  }
}

function BoardsPage(props) {
  const { history, match } = props;
  const user_name = match.params.user;
  const user_data = get_user_data(user_name);
  
  return(
    <>
      <Boards user_data={user_data} history={history}/>
    </>
  )
}

export default BoardsPage;