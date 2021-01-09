import React, { useState, useEffect, useRef } from "react";
import "./CardModal.css";
import Activity from "./Activity.js";
import apis from '../../Library/Apis';
import ReactMarkdown from 'react-markdown';
import DatePicker from 'react-date-picker'
import { useBoardContext } from "../../Contexts";
import 'react-calendar/dist/Calendar.css';
import { _sleep } from "../../Library/Timer";


function CardModal({
  cardName,
  card_key,
  card_id,
  exit,
  list_name,
  board_id,
  putCard,
  deleteCard,
  putActivity,
  deleteActivity,
  boardUsers
}) {
  const [card, setCard] = useState(undefined);
  const [nameState, setNameState] = useState({ name: cardName, edit: false });
  const { fetchBoardById } = useBoardContext();

  const postActivity = (cId, content) => {
    if (!content) return;
    console.log(content);
    apis.activity.post({ card_id: cId, content })
      .then(async (response) => {
        getCard();
      })
      .catch((err) => console.log(err));
  };

  function getCard() {
    apis.card
      .getByKey({ key: card_key })
      .then(function (response) {
        setCard(response.data);
        setNameState({ ...nameState, name: response.data.name });
        setDescription({ ...description, text: response.data.description });
      })
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
  }

  useEffect(() => {
    getCard();
  }, []);

  const exitIfNotModal = (e) => {
    if (
      e.target.id.includes("card-modal-wrapper") ||
      e.target.className === "blank-for-card-modal" ||
      e.target.id === "exit"
    ) {
      exit();
    }
  };

  const [button, setButton] = useState({ display: false, green: false });
  const [detail, setDetail] = useState(true);
  const [comment, setComment] = useState("");
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
    apis.card
      .put({ id: card_id, name })
      .then((response) => fetchBoardById({id: board_id}))
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

    setNameState({ ...nameState, edit: false });
  };

  //Description 추가 및 변경하기
  const [description, setDescription] = useState({
    exist: false,
    text: undefined,
    edit: false,
  });
  const saveDescription = () => {
    setDescription({...description, edit: false});
    putCard({ cId: card_id, description: description.content })
  }

  // 멤버 추가하기
  const [member, setMember] = useState({on: false, search: ""})
  const memberList = member.search
    ? boardUsers
        .filter((item) => boardUsers.find((it) => it.id === item.id))
        .filter((item) => item.username.includes(member.search))
    : boardUsers
        .filter((item) => boardUsers.find((it) => it.id === item.id));
  const addMember = (username) => {
    putCard({cId: card_id, member: username});
    alert(
      "[ERROR] NO ACTIVITY PREPARED EXCEPT COMMENTS\n(Failed to add Members)"
    );
  };
  // Due Date 추가하기
  const [due, setDue] = useState(false);
  const [date, setDate] = useState(undefined);
  const saveDueDate = (e) => {
  const date_ = e.target.children? 
      (e.target.children['0']? 
        (e.target.children['0'].ariaLabel? 
          e.target.children['0'].ariaLabel
            : null) : null) : null;
  if (date_ === null || date_.length < 10) {
    //alert(`not saved to server / ${date_}`);
    return;
    }
  else {
    setDue(false);
    const [year, md] = date_.split("년 ");
    let [month, day] = md.split("월 ");
    day = day.split("일")[0];
    if (month.length === 1) month = "0" + month;
    if (day.length === 1) day = "0" + day;

    putCard({cId: card_id, due_date: `${year}-${month}-${day}`});
    }
  };
  //"Thu Jan 14 2021 00:00:00 GMT+0900 (대한민국 표준시)00:30"

  const activities = useRef();

  return (
    <div
      id="card-modal-wrapper"
      draggable="false"
      onClick={exitIfNotModal}
      style={{ cursor: "default" }}
    >
      <div
        id="card-modal-wrapper-2"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div className="blank-for-card-modal" />

        <div id="card-modal">
          <div id="card-modal-top">
            <div style={{ display: "float" }}>
              {nameState.edit ? (
                <>
                  <input
                    style={{
                      fontWeight: 700,
                      fontSize: 20,
                      float: "left",
                      marginBottom: 3,
                    }}
                    value={nameState.name}
                    onChange={cardNameChange}
                    onBlur={() =>
                      nameState.edit
                        ? changeName(card_id, nameState.name)
                        : null
                    }
                  />
                </>
              ) : (
                <p
                  style={{ fontWeight: 700, fontSize: 20, float: "left" }}
                  onClick={() => setNameState({ ...nameState, edit: true })}
                >
                  {nameState.name}
                </p>
              )}
              <p>{!card? "" : (!card.due_date? "" : card.due_date)}</p>
              <button
                style={{ float: "right", display: "inline-block", width: 25 }}
                className="card-modal-x"
                id="exit"
              >
                ×
              </button>
            </div>
            <p id="card-modal-listname">
              in list{" "}
              <span style={{ textDecoration: "underline" }}>{list_name}</span>
            </p>
          </div>

          <div id="card-modal-bottom">
            <div id="card-modal-left" style={{ maxHeight: 550, overflowY: 'auto' }}>
              <p className="title">Description</p>
              {description.edit 
              
              ? (
                <div style={{height: 100}}><textarea
                    style={{
                      fontSize: 14,
                      marginLeft: 5,
                      borderRadius: 5,
                      outline: "none",
                      cols: '4900px',
        
                      border: "1px solid lightgray",
                      marginRight: 5,
                      padding: 5
                    }}
                    value={description.content}
                    onChange={(e) =>
                      setDescription({
                        ...description,
                        text: e.target.value,
                      })
                    }
                  />
                  <div style={{display: 'flex', flexDirection: 'row'}}><button 
                    style={{
                        backgroundColor: "#5AAC44",
                        color: "white",
                        marginTop: 7,
                        marginLeft: 7,
                        marginBottom: 10,
                        width: 50,
                        height: 30,}}
                  onClick={saveDescription}>Save</button>
                  <button
                    style={{ float: "right", display: "inline-block", width: 25 }}
                    className="card-modal-x"
                    onClick={() => setDescription({...description, edit: false})}
                  >
                    ×
                  </button></div>
                </div>
                ) 
              
              : (!(description === undefined || description['content'] === undefined || description['content' === ""]))
                  
                  ? (
                    <div onClick={() => setDescription({...description, edit: true})} style={{width: 485, marginBottom: 10, marginTop: 10, height: 'fit-content'}}>
                      <ReactMarkdown id="Markdown" style={{height: 'fit-content', background: 'pink'}}>
                        {description['content']}
                      </ReactMarkdown> 
                      </div> )
                  : (
                    <button
                      style={{width: 485, textAlign: 'left', height: 50, paddingLeft: 10, marginLeft: 5, paddingTop: 0}}
                      onClick={() => setDescription({ ...description, edit: true })}
                      id="card-modal-add-descrip"
                    >
                      Add a more detailed description...
                    </button>
                  )}

              <div style={{ display: "flex", flexDirection: 'row'}}>
                <p className="title" >
                  Activity
                </p>
                <button id="card-modal-detail" 
                onClick={(e) => setDetail(!detail)} 
                style={{width: 100, position: 'relative', left: 324, top: 10}}>{detail? "Hide Details" : "Show Details"}</button>
              </div>
              <div ref={activities} id="card-modal-activities" style={{marginTop: 20}}>              
              <div style={{display: 'flex', flexDirection: 'row'}}>
                  <img
                    style={{
                      height: 35,
                      width: 35,
                      borderRadius: "50%",
                      marginBottom: 15,
                      marginRight: 10,
                      position: "relative",
                      top: 4,
                      left: 2,
                    }}
                    src="https://assets.leetcode.com/users/bundhoo/avatar_1527798889.png"
                    alt={String(cardName)}
                  />
                  <div
                    style={{
                      backgroundColor: "white",
                      padding: 3,
                      paddingBottom: 0,
                      border: "1.5px lightgray solid",
                      borderRadius: 3,
                      marginBottom: 5,
                            display: 'flex',                flexDirection: 'column'
                    }}
                  >
                    <input
                      style={{ fontSize: 15, width: 415 }}
                      //width: activities.current.isVerticalScroll() ? 510 : 450
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

                    <button
                      onClick={saveComment}
                      style={{
                        display: button.display ? null : "none",
                        backgroundColor: button.green ? "#5AAC44" : "lightgray",
                        color: button.green ? "white" : "gray",
                        marginTop: button.display ? 7 : 0,
                        marginLeft: button.display ? 7 : 0,
                        marginBottom: 10,
                        width: 50,
                        height: 30,
                      }}
                    >
                      Save
                    </button>
                  </div>
                </div>

                {card !== undefined
                  ? card.activities
                      .slice()
                      .reverse()
                      .map((data, index) => (
                        <Activity
                          data={data}
                          getCard={getCard}
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
              <div style={{display: 'flex', flexDirection: 'row'}}>
                <button className="nodt" style={member.on? {filter: 'brightness(95%)'}: null} onClick={() => setMember({on: !member.on, search: ""})}>Members</button>
                  <div className="invite-wrapper" style={{position: 'relative', top: -38, left: 20}}>
                    {member.on ? (
                      <div className="invite-modal" style={{height: 'fit-content'}}>
                        <div className="im-header">
                          <span>Board Members</span>
                        </div>

                        <hr />

                        <div className="im-input-wrapper">
                          <input
                            className="im-input"
                            value={member.search}
                            placeholder="Search members"
                            onChange={(e) => setMember({...member, search: e.target.value})}
                          />
                        </div>

                        <div
                          id="inviteUsers"
                          style={{
                            maxHeight: 280,
                            overflowY: 'auto',
                            background: "white",
                            position: "relative",
                            top: -5,
                            paddingRight: memberList.length > 4 ? 5 : 0,
                          }}
                        >
                          {memberList.map((item, index) => {
                            return (
                              <>
                                <div
                                  className="inviteUser"
                                  key={index}
                                  onClick={() =>
                                    addMember(item.username)
                                  }
                                  style={{
                                    padding: 10,
                                    height: "fit-content",
                                    textAlign: "left",
                                    display: "flex",
                                    flexDirection: "row",
                                    marginTop: index === 0 ? 1 : 5,
                                    marginBottom: index === memberList.length - 1 ? 1 : 5,
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
                              </>
                            );
                          })}
                        </div>
                      </div>
                    ) : null}
                  </div>
                  </div>
              

              <button className="nodt" >Labels</button>
              <button className="nodt" >Checklist</button>
              
              
              <div
              onClick={(e) => {/*console.log(e.target)*/}}>
              <button  className="nodt" 
              onClick={() => setDue(!due)}
              style={due? {filter: 'brightness(95%)'} : null}
              >Due Date</button>
              {due? 
              <div id="DUEDATE" style={{backgroundColor: '#F4F5F7', zIndex: 900, fontSize: 15}}>
            
              <div style={{display: 'float'}}>
              <div id="NOBUTTON" >
              <DatePicker
              autoFocus={true}
              onChange={setDate}
              value={date}
              closeCalendar={false}
              isOpen={true}
              onClick={saveDueDate}
              /></div>
              </div>

              </div>
              : null}
              </div>
              
             
              <p style={due? null : {marginTop: 27}}>
                POWER-UPS
              </p>
              <button className="nodt" >+ Add Power-Ups</button>
              <p>Get unlimited Power-Ups, plus much more.</p>
              <button className="nodt"  style={{ background: "#EDDBF4", paddingTop: 3 }}>
                <img
                  style={{ position: "relative", top: 2, marginRight: 3 }}
                  src="https://api.iconify.design/octicon:heart-24.svg?height=14"
                />
                Upgrade Team
              </button>
              <p>
                <br />
                BUTLER{" "}
                <span
                  style={{
                    color: "green",
                    background: "#D6ECD2",
                    marginLeft: 3,
                    padding: 3,
                    paddingLeft: 7,
                    paddingRight: 7,
                    borderRadius: 10,
                  }}
                >
                  NEW
                </span>{" "}
                <span
                  style={{
                    position: "relative",
                    top: 2,
                    left: 30,
                    text:
                      "url('https://api.iconify.design/octicon:info-24.svg?height=15')",
                    verticalAlign: "-0.125em",
                  }}
                />
              </p>
              <button className="nodt" >+ Add Card Button</button>
              <button className="nodt" 
                style={{
                  marginTop: 15,
                  fontWeight: 600,
                  border: "1px lightgray solid",
                }}
                onClick={() => deleteCardClick(card_id)}
              >
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
