import { useEffect, useState } from "react";
import { Boards } from "../../Components";
import { useUserContext } from "../../Contexts";
import apis from "../../Library/Apis";

const RECENT_BOARDS = 3;

// sort()를 위핸 comparator function
const bComparator = (board1, board2) => {
  // TODO: board1을 board2보다 최근에 봤으면 -1, 아니면 1을 리턴
  return 0;
};

function BoardsPage({ history }) {
  const { user, fetchUserList } = useUserContext();
  const [boards, setBoards] = useState([]);

  const fetchBoards = () => {
    apis.board
      .getAll()
      .then((response) => {
        setBoards(response.data.results);
      })
      .catch((err) => console.log(err));
  };

  const postBoard = async (name) => {
    if (!name) return;
    apis.board
      .post({ name })
      .then((response) => {
        fetchBoards();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchBoards();
    fetchUserList();
  }, []);

  const personal = boards;
  const starred = boards.filter((item) => item.star);
  const recent = boards.slice().sort(bComparator).slice(0, RECENT_BOARDS);

  return (
    <>
      <Boards
        user_data={user}
        personal={personal}
        starred={starred}
        recent={recent}
        postBoard={postBoard}
        refreshBoards={fetchBoards}
      />
    </>
  );
}

export default BoardsPage;
