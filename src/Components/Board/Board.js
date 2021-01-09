import "./Board.css";
import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import List from "./List.js";
import apis from "../../Library/Apis";
import { useBoardContext } from "../../Contexts";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const _sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

function Board({
  boardUsers,
  userList,
  modal,
  board,
  postList,
  postCard,
  putCard,
  deleteCard,
  putActivity,
  deleteActivity,
}) {
  const [crtList, setCrtList] = useState(false);
  const [listInput, setListInput] = useState("");
  const [invite, setInvite] = useState(false);
  const [inviteInput, setInviteInput] = useState("");
  const [loading, setLoading] = useState(true);
  const { fetchBoardById, fetchUserList } = useBoardContext();

  const wait = async (delay) => {
    await _sleep(delay);
    setLoading(false);
  };

  useEffect(() => {
    wait(500);
  }, []);

  const toggleInvite = () => {
    setInvite(!invite);
  };

  const inviteMember = (id, username) => {
    apis.board
      .invite({ id: id, username: username })
      .then((response) => fetchUserList(board.id))
      .then(response => fetchBoardById({id: board.id}))
      .catch((err) => alert(err.response.data.error));
  };

  const createListEnter = (e) => {
    if (e.key === "Enter") {
      createList();
    }
  };

  const createList = () => {
    setCrtList(false);
    postList(board.id, listInput);
    setListInput("");
  };

  const inviteOnChange = (e) => {
    setInviteInput(e.target.value);
  };

  const no_crtList = () => {
    setCrtList(false);
    setListInput("");
  };

  const [boardName, setBoardName] = useState({
    content: undefined,
    edit: false,
    save: false,
    id: undefined,
    dash: undefined,
  });

  const onClickChangeName = () => {
    setBoardName({...boardName, edit: false});

    apis.board
      .put({ id: boardName.id, name: boardName.content })
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
    if (boardName.content !== undefined) {
      window.history.pushState(

      {
        data:
          "바뀐 주소와 함께 저장할 데이터 객체가 이 첫 번째 파라미터. 바뀔 페이지의 정보들을 담아두고 클라이언트에서 정보를 활용해 새로운 페이지를 렌더링하면 된다. 정보는 history.state로 접근하면 된다.",
      },
      "바꿀 제목",
      `/b/${String(board.id).padStart(8,'0')}/${boardName.content.replaceAll(" ", "-")}`
    );
  }
}

  const eUsers = inviteInput
    ? userList
        .filter((item) => !boardUsers.find((it) => it.id === item.id))
        .filter((item) => item.username.includes(inviteInput))
    : userList
        .filter((item) => !boardUsers.find((it) => it.id === item.id))

  const deleteBoard = () => {
    apis.board
      .delete({
        // 서버에서 req.body.{} 로 확인할 수 있다.
        id: board.id,
        //withCredentials: true,
      })
      .then((response) => null)
      .catch(function (error) {
        if (error.response) {
          console.log(
            "요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다."
          );
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log("요청이 이루어 졌으나 응답을 받지 못했습니다.");
          // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
          // Node.js의 http.ClientRequest 인스턴스입니다.
          console.log(error.request);
        } else {
          console.log(
            "오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다."
          );
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
    return <Redirect to="/username/boards" />;
  };

  const toggleStar = (target) => {
    apis.board
      .put({ id: board.id, star: target })
      .then((response) => {
        fetchBoardById({ id: board.id });
      })
      .catch((err) => console.log(err));
  };

  if (!board) return <div className="board-wrapper"><img alt="p" src="https://a.trellocdn.com/prgb/dist/images/header-loading-logo.d73159084f5122775d4d.gif"/></div>;

  return (
    <>
      {loading ? (
        <div className="board-wrapper"><img alt="p" src="https://a.trellocdn.com/prgb/dist/images/header-loading-logo.d73159084f5122775d4d.gif"/></div>
      ) : (
        <div className="board-wrapper anime"><img alt="p" src="https://a.trellocdn.com/prgb/dist/images/header-loading-logo.d73159084f5122775d4d.gif"/></div>
      )}
      <div id="Board-wrapper">
        <header id="board-header">
          <div id="board-header-left">
            <select style={{cursor: 'pointer', fontSize: 15}} name="language" defaultValue="English (US)">
              <option style={{cursor: 'pointer', fontSize: 15, marginTop: 3, marginBottom: 3}} value="Board">Board</option>
              <option style={{cursor: 'pointer', fontSize: 15, marginTop: 3, marginBottom: 3}}  value="Calendar">Calendar</option>
              <option style={{cursor: 'pointer', fontSize: 15, marginTop: 3, marginBottom: 3}}  value="Map">Map</option>
            </select>

            {boardName.edit? 
            <input className="noOutline" style={{paddingLeft:15, paddingRight: 10, backgroundColor: '#35A7EE', color: 'white', border: '0px transparent solid', outline: 'none', fontWeight: 600, fontSize: 20, boxShadow: 'none', width: 'fit-content', borderRadius: 5, padding: 0}}
              value={boardName.content} onChange={(e) => setBoardName({...boardName, content: e.target.value})}
              onBlur={onClickChangeName}
              onKeyPress={(e) => (e.key === 'Enter')? onClickChangeName() : null}
            />: 
            <h3 style={{cursor: 'default'}} onClick={(e) => setBoardName({...boardName, edit: true, content: boardName.content !== undefined? boardName.content : board.name, id: board.id})} id="board-name">{boardName.content === undefined? board.name : boardName.content}</h3>}

            <button
              id="board-header-star"
              onClick={() => {
                board.star ? toggleStar("False") : toggleStar("True");
              }}
            >
              <FontAwesomeIcon className={`star ${board.star}`} icon={faStar} />
            </button>
            <div className="board-header-vertical-line" />
            <button>
              {boardName.content !== undefined? boardName.content : board.name}
              <span id="board-header-freeboard">Free</span>
            </button>
            <div className="board-header-vertical-line" />
            <button>Private</button>
            <div className="board-header-vertical-line" />

            <div id="board-profile-images" style={{display: 'flex', flexDirection: 'row', height: 28}}>
             {boardUsers.slice(0, 5).map((item, index) => {
                    return (<img key={index} style={{width: 28, height: 28, borderRadius: '50%'}} src="https://assets.leetcode.com/users/bundhoo/avatar_1527798889.png" alt="profile"/>)
              })}
            <div style={{
              cursor: 'default',
              display: boardUsers.length > 5 ? null : 'none', 
              width: 'fit-content', 
              height: 28,
              borderRadius: '50%',
              backgroundColor: '#35A7EE',
              fontSize: 12,
              paddingLeft: 0,
              paddingRight: 5,
              position: 'relative',
              top: 0
              }}>
                <p>+{boardUsers.length - 5}</p>
              </div>
            </div>
            <div className="invite-wrapper">
              <button className="inviteButton" onClick={toggleInvite}>
                Invite
              </button>
              {invite ? (
                <div className="invite-modal">
                  <div className="im-header">
                    <span>Invite to Board</span>
                  </div>

                  <hr />

                  <div className="im-input-wrapper">
                    <input
                      className="im-input"
                      value={inviteInput}
                      placeholder="Enter name here"
                      onChange={inviteOnChange}
                    />
                  </div>

                  <div
                    id="inviteUsers"
                    style={{
                      height: 280,
                      background: "white",
                      overflowY: "auto",
                      position: "relative",
                      top: -5,
                      paddingRight: eUsers.length > 4 ? 5 : 0,
                    }}
                  >
                    {eUsers.map((item, index) => {
                      return (
                        
                          <div
                            className="inviteUser"
                            key={index}
                            onClick={() =>
                              inviteMember(board.id, item.username)
                            }
                            style={{
                              padding: 10,
                              height: "fit-content",
                              textAlign: "left",
                              display: "flex",
                              flexDirection: "row",
                              marginTop: index === 0 ? 1 : 5,
                              marginBottom: index === eUsers.length - 1 ? 1 : 5,
                            }}
                          >
                            <img
                              style={{
                                height: 25,
                                width: 25,
                                borderRadius: "50%",
                                position: "relative",
                                top: 3,
                                left: 3,
                              }}
                              src="https://assets.leetcode.com/users/bundhoo/avatar_1527798889.png"
                              alt={"profile"}
                            />
                            <p
                              style={{
                                position: "relative",
                                top: -7,
                                marginLeft: 15,
                                pontWeight: 300,
                              }}
                            >
                              {item.username}
                            </p>
                          </div>
                        
                      );
                    })}
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          <div id="board-header-right">
            <button>Calendar</button>
            <button>Butler</button>
            <button>Show Menu</button>
            <button onClick={deleteBoard}>DELETE</button>
          </div>
        </header>

        <div className={`board-main ${modal ? "up" : ""}`}>
          <div id="board-lists">
            <div id="board-temp">
              <DndProvider backend={HTML5Backend}>
                {board.lists.map((data, index) => (
                  <List
                    board={board}
                    data={data}
                    index={index}
                    key={index}
                    postCard={postCard}
                    putCard={putCard}
                    deleteCard={deleteCard}
                    putActivity={putActivity}
                    deleteActivity={deleteActivity}
                    boardUsers={boardUsers}
                  />
                ))}
              </DndProvider>

              <div>
                <button id="board-addlist" onClick={() => setCrtList(true)}>
                  <span id="board-addlist-plus">+</span>Add another list
                </button>
                {crtList ? (
                  <div className="crtList">
                    <textarea
                      placeholder="Enter list title..."
                      style={{fontSize: 15, fontWeight: 600, outline: 'none', width: 300}}
                      onChange={(e) => setListInput(e.target.value)}
                      value={listInput}
                    />
                    <button onKeyPress={createListEnter} onClick={createList}>
                      Add List
                    </button>
                    <button id="no_crtList" onClick={no_crtList}></button>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Board;
