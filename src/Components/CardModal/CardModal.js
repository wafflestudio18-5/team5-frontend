import React, { useState, useEffect } from "react";
import "./CardModal.css";
import Activity from "./Activity.js";
import apis from '../../Library/Apis';

function CardModal({ cardName, setCardName, card_key, card_id, exit, list_name, board_id, putCard, deleteCard, postActivity, putActivity, deleteActivity }) {
  const [card, setCard] = useState(undefined);
  const [nameState, setNameState] = useState({ name: cardName, edit: false });
  const [refresh, setRefresh] = useState(false);

  function getCard() {
    apis.card.getByKey({key: card_key})
      .then(function (response) {
        setCard(response.data);
        setNameState({ ...nameState, name: response.data.name });
        setDescription({...description, content: response.data.description.content})
      })
      .catch(function (error) {
        if (error.response) {
          console.log("요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다."
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
          console.log("오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다."
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
  const [detail, setDetail] = React.useState(true);
  const [comment, setComment] = React.useState("");
  const changeComment = (e) => {
    setComment(e.target.value);
    e.target.value === ""
      ? setButton({ ...button, green: false })
      : setButton({ ...button, green: true });
  };

  //댓글 달고 저장하기
  const saveComment = () => {
    postActivity(String(card_id), comment);
  };

  //해당 카드 지우기
  const deleteCardClick = () => {
    deleteCard(String(card_id));
    exit();
  };

  //카드의 제목 바꾸기
  const cardNameChange = (e) => {
    setNameState({ ...nameState, name: e.target.value });
  };
  const changeName = (card_id, name) => {
    apis.card.put( { id: card_id, name })
      .then(function (response) {
      })
      .catch(function (error) {
        if (error.response) {
          console.log("요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다."
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
          console.log("오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다."
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
  useEffect(() => {
    // 서버에 description 변경
    putCard({cId: card_id, description: description})
  }, [description.edit && false]);

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
      <div id="card-modal-wrapper-2" style={{display: 'flex', flexDirection: 'column'}}>
        <div className="blank-for-card-modal" />

        <div id="card-modal">
          <div id="card-modal-top">
          <div style={{display: 'float'}}>
            {!nameState.edit ? (
              <p style={{ fontWeight: 700, fontSize: 20, float:'left' }}
                onClick={() => setNameState({ ...nameState, edit: true })}>
                {nameState.name}
              </p>
            ) : (
              <>
                  <input
                  style={{ fontWeight: 700, fontSize: 20, float: 'left' }}
                  value={nameState.name}
                  onChange={cardNameChange}
                  onBlur={() => nameState.edit ? changeName(card_id, nameState.name) : null}
                />
              </>
            )}
            <button style={{ float: 'right', display: 'inline-block' }} id="card-modal-x" /></div>
            <p id="card-modal-listname">
              in list{" "}
              <span style={{ textDecoration: "underline" }}>{list_name}</span>
            </p>
          </div>

          <div id="card-modal-bottom">
            <div id="card-modal-left" style={{ columnWidth: 400 }}>
              <p className="title">Description</p>
              {description.edit ? (
                  <input
                    onKeyPress={(e) => e.key === "Enter"? 
                    (e.target.value === ""? setDescription({...description, edit: false}) : setDescription({...description, exist: true, edit: false})): null}
                    onBlur={(e) => e.target.value === ""? setDescription({...description, edit: false}) : setDescription({...description, exist: true, edit: false})}
                    value={description.content}
                    onChange={(e) =>
                      setDescription({
                        ...description,
                        content: e.target.value,
                      })
                    }
                  />
                ) : ((description.content !== "" && description.content !== undefined) ? (
                  <p onClick={() => setDescription({ ...description, edit: true })}>
                    {description.content}
                  </p>
                )
               : (
                <button
                  onClick={() => setDescription({ ...description, edit: true })}
                  id="card-modal-add-descrip"
                >
                  Add a more detailed description...
                </button>
              ))}

              <div style={{display: 'float'}}>
                <p className="title" style={{float: 'left'}}>
                  Activity
                </p>
                <button id="card-modal-detail" onClick={(e) => setDetail(!detail)} style={{float: 'right', display: 'inline-block', width: 100}}>{detail? "Hide Details" : "Show Details"}</button>
              </div>

              <div id="card-modal-activities" style={{height: button.display? 242 : 280, maxHeight: button.display? 242 : 280, overflowX: 'auto', marginTop: 20}}>              
              <div style={{display: 'flex', flexDirection: 'row'}}>
                <img style={{
                  height: 35, width: 35, borderRadius: '50%', marginBottom: 15, marginRight: 10, position: 'relative', top: 4, left: 2}} 
                  src="https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg" alt={String(cardName)}/> {/*TODO 프사설정*/}
                <div style={{
                  backgroundColor: 'white', 
                  padding: 3, 
                  paddingBottom: 0,
                  border: '1.5px lightgray solid',
                  borderRadius: 3,
                  marginBottom: 5
                  }}>
                  <input
                  style={{fontSize: 15}}
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
                  />

                <div><button
                  onClick={saveComment}
                  style={{
                    display: button.display ? null : "none",
                    backgroundColor: button.green ? "#5AAC44" : "lightgray",
                    color: button.green ? "white" : "gray",
                    marginTop: button.display? 7 : 0,
                    marginLeft: button.display? 7 : 0,
                    marginBottom: 5,
                    width: 50,
                    height: 30
                  }}
                >
                  Save
                </button></div></div>
              </div>

                {card !== undefined
                  ? card.activities.slice().reverse().map((data, index) => (
                    <Activity
                      data={data}
                      refresh={refresh}
                      setRefresh={setRefresh}
                      key={index}
                      postActivity={postActivity}
                      putActivity={putActivity}
                      deleteActivity={deleteActivity}
                      detail={detail}
                    />
                  ))
                : null}
              </div>
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
              <button style={{background: '#EDDBF4', paddingTop: 3}}><img style={{position: 'relative', top: 2, marginRight: 3}} src='https://api.iconify.design/octicon:heart-24.svg?height=14'/>Upgrade Team</button>
              <p>
                <br />
                BUTLER <span style={{color: 'green', background: '#D6ECD2', marginLeft: 3, padding: 3, paddingLeft: 7, paddingRight: 7, borderRadius: 10}}>NEW</span> <span style={{position: 'relative', top: 2, left: 30, content: "url('https://api.iconify.design/octicon:info-24.svg?height=15')", verticalAlign: '-0.125em'}}/>
              </p>
              <button>+ Add Card Button</button>
              <button style={{marginTop: 15, fontWeight: 600, border: '1px lightgray solid'}} onClick={() => deleteCardClick(card_id)}>
                Delete Card
              </button>
            </div>
          </div>
        </div>

        <div className="blank-for-card-modal" />
      </div>
    </div>
  );
}

export default CardModal;