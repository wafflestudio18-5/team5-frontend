import React, { useState, useEffect } from "react";
import "./CardModal.css";
import Activity from "./Activity.js";
import apis from '../../Library/Apis';

function CardModal({ cardName, setCardName, card_key, card_id, exit, list_name, board_id, deleteCard, postActivity, putActivity, deleteActivity }) {
  const [card, setCard] = useState(undefined);
  const [nameState, setNameState] = useState({ name: cardName, edit: false });
  const [refresh, setRefresh] = useState(false);

  function getCard() {
    apis.card.get({key: card_key})
      .then(function (response) {
        console.log("카드 정보 받아오기 성공");
        console.log(response.data);
        setCard(response.data);
        setNameState({ ...nameState, name: response.data.name });
      })
      .catch(function (error) {
        if (error.response) {
          console.log(
            "// 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다."
          );
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log("// 요청이 이루어 졌으나 응답을 받지 못했습니다.");
          // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
          // Node.js의 http.ClientRequest 인스턴스입니다.
          console.log(error.request);
        } else {
          console.log(
            "// 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다."
          );
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  }

  useEffect(() => {
    getCard();
  }, [refresh]);

  const exitIfNotModal = (e) => {
    if (
      e.target.id.includes("card-modal-wrapper") ||
      e.target.className === "blank-for-card-modal" ||
      e.target.id === "card-modal-x"
    ) {
      exit();
    }
  };

  const [button, setButton] = React.useState({ display: false, green: false });
  const [comment, setComment] = React.useState("");
  const changeComment = (e) => {
    setComment(e.target.value);
    e.target.value === ""
      ? setButton({ ...button, green: false })
      : setButton({ ...button, green: true });
  };

  //댓글 달고 저장하기 TODO 안 뜸 아놔
  const saveComment = () => {
    postActivity(String(card_id), comment);/*() => {
        setRefresh(!refresh);
        setComment("");
        setButton({ display: false, green: false });
      });*/
  };

  //해당 카드 지우기
  const deleteCardClick = () => {
    deleteCard();
    exit();
  };

  //카드의 제목 바꾸기
  const cardNameChange = (e) => {
    setNameState({ ...nameState, name: e.target.value });
  };
  const changeName = (card_id, name) => {
    apis.card.put( { id: card_id, name })
      .then(function (response) {
        console.log("카드 제목 바꾸기 성공");
      })
      .catch(function (error) {
        if (error.response) {
          console.log(
            "// 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다."
          );
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log("// 요청이 이루어 졌으나 응답을 받지 못했습니다.");
          // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
          // Node.js의 http.ClientRequest 인스턴스입니다.
          console.log(error.request);
        } else {
          console.log(
            "// 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다."
          );
          console.log("Error", error.message);
        }
        console.log(error.config);
      });

    setNameState({ ...nameState, edit: false });
    setCardName(nameState.name); // 리스트 화면에 보이는 카드 이름 변경
  };

  //Description 추가 및 변경하기
  const [description, setDescription] = useState({
    exist: false,
    content: "",
    edit: false,
  });
  // 멤버 추가하기
  const addMember = () => {
    alert(
      "[ERROR] NO ACTIVITY PREPARED EXCEPT COMMENTS\n(Failed to add Members)"
    );
  };
  // Due Date 추가하기
  const addDuedate = () => {
    alert(
      "[ERROR] NO ACTIVITY PREPARED EXCEPT COMMENTS\n(Failed to add Due Date)"
    );
  };

  return (
    <div id="card-modal-wrapper" onClick={exitIfNotModal}>
      <div id="card-modal-wrapper-2">
        <div className="blank-for-card-modal" />

        <div id="card-modal">
          <div id="card-modal-top">
            {!nameState.edit ? (
              <p
                style={{ fontWeight: 700, fontSize: 20 }}
                onClick={() => setNameState({ ...nameState, edit: true })}
              >
                {nameState.name}
              </p>
            ) : (
              <>
                  <input
                  style={{ fontWeight: 700, fontSize: 20 }}
                  value={nameState.name}
                  onChange={cardNameChange}
                  onBlur={() =>
                    nameState.edit ? changeName(card_id, nameState.name) : null
                  }
                />
              </>
            )}
            <button id="card-modal-x" />
            <p id="card-modal-listname">
              in list{" "}
              <span style={{ textDecoration: "underline" }}>{list_name}</span>
            </p>
          </div>

          <div id="card-modal-bottom">
            <div id="card-modal-left" style={{ columnWidth: 400 }}>
              <p className="title">Description</p>
              {description.exist ? (
                description.edit ? (
                  <input
                    value={description.content}
                    onChange={(e) =>
                      setDescription({
                        ...description,
                        content: e.target.value,
                      })
                    }
                  />
                ) : (
                  <p
                    onClick={() =>
                      setDescription({ ...description, edit: false })
                    }
                  >
                    {description.content}
                  </p>
                )
              ) : (
                <button
                  onClick={() => setDescription({ ...description, edit: true })}
                  id="card-modal-add-descrip"
                >
                  Add a more detailed description...
                </button>
              )}
              <p className="title">
                <br />
                Activity
              </p>
              <button>Hide Details</button>
              <p>TODO PIC</p>

              <div style={{
                backgroundColor: 'white', 
                padding: 5, 
                border: '1px lightgray solid',
                boxShadow: '0px 3px 5px lightgray'
                }}>
              
              <div><input
                value={comment}
                onChange={changeComment}
                onFocus={() => setButton({ ...button, display: true })}
                onBlur={(e) =>
                  e.target.value === ""
                    ? setButton({ display: false, green: false })
                    : null
                }
                id="card-comment"
                placeholder="Write a comment..."
              /></div>
              <div><button
                onClick={saveComment}
                style={{
                  display: button.display ? null : "none",
                  backgroundColor: button.green ? "#5AAC44" : "lightgray",
                  color: button.green ? "white" : "gray",
                  marginTop: 5,
                  marginLeft: 7,
                  marginBottom: 5,
                  width: 50,
                  height: 30
                }}
              >
                Save
              </button></div></div>
              <p>TODO 댓글목록 ul li ...</p>
              {card !== undefined
                ? card.activities.reverse().map((data, index) => (
                    <Activity
                      data={data}
                      refresh={refresh}
                      setRefresh={setRefresh}
                      key={index}
                      postActivity={postActivity}
                      putActivity={putActivity}
                      deleteActivity={deleteActivity}
                    />
                  ))
                : null}
              <button onClick={() => deleteCardClick(card_id)}>
                Delete Card
              </button>
            </div>

            <div id="card-modal-right" style={{ columnWidth: 200 }}>
              <p>SUGGESTED</p>
              <p>
                <br />
                ADD TO CARD
              </p>
              <button onClick={addMember}>Members</button>
              <button>Labels</button>
              <button>Checklist</button>
              <button onClick={addDuedate}>Due Date</button>
              <p>
                <br />
                POWER-UPS
              </p>
              <button>+ Add Power-Ups</button>
              <p>Get unlimited Power-Ups, plus much more.</p>
              <button>Upgrade Team</button>
              <p>
                <br />
                BUTLER <span>NEW</span> <span style={{position: 'relative', top: 2, left: 40, content: "url('https://api.iconify.design/octicon:info-24.svg?height=15')", verticalAlign: '-0.125em'}}/>
              </p>
              <button>+ Add Card Button</button>
            </div>
          </div>
        </div>

        <div className="blank-for-card-modal" />
      </div>
    </div>
  );
}

export default CardModal;