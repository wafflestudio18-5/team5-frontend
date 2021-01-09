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
  const [page, setPage] = useState(2);
  const [fetching, setFetching] = useState(false);

  const fetchBoards = async () => {
    if(fetching) return;

    setFetching(true);
    await apis.board
      .getAll()
      .then((response) => {
        console.log(response);
        setBoards(response.data.results);
      })
      .catch((err) => console.log(err));
    setFetching(false);
  };

  
  const fetchMoreBoards = async () => {
    // 추가 데이터를 로드하는 상태로 전환
    if(fetching) return;

    setFetching(true);
    
    // API로부터 받아온 페이징 데이터를 이용해 다음 데이터를 로드
    await apis.board.getPage(page)
      .then((response) => {
        const fetchedData = response.data.results; // 피드 데이터 부분
        // 기존 데이터 배열과 새로 받아온 데이터 배열을 합쳐 새 배열을 만들고 state에 저장한다. 
        const mergedData = [...boards, ...fetchedData];
        setBoards(mergedData);
        setPage(page + 1);
    }).catch(err => console.log(err));
    // 추가 데이터 로드 끝
    setFetching(false);
  };

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight && fetching === false) {
      // 페이지 끝에 도달하면 추가 데이터를 받아온다
      fetchMoreBoards();
    }
   };

  const postBoard = (name) => {
    if (!name) return;
    apis.board
      .post({ name })
      .then((response) => {
        fetchBoards();
        setPage(2);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchBoards();
    window.addEventListener("scroll", handleScroll);
    fetchUserList();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const personal = boards.slice();
  const starred = boards.slice().filter((item) => item.star);
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
