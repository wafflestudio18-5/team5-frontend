import React, {useState} from 'react';
import './CardModal.css';
import Activity from './Activity.js';
import axios from "axios";

function CardModal({setCardName, card_key, card, exit, list_name, board_id, postActivity, putActivity, deleteActivity, deleteCard}) {

  const exitIfNotModal = (e) => {
    if (e.target.id.includes("card-modal-wrapper") || e.target.className === "blank-for-card-modal" || e.target.id === "card-modal-x") {
      exit();
    }
  }

  const [button, setButton] = React.useState({display: false, green: false});
  const [comment, setComment] = React.useState("");
  const changeComment = (e) => {
    setComment(e.target.value);
    (e.target.value === "") ? setButton({...button, green: false}) : setButton({...button, green: true})
  }

  //댓글 달고 저장하기 TODO 안 뜸 아놔
  const saveComment = () => {
    //postActivity(card.id, comment);

    axios.post("/api/v1/activity/", { card_id: String(card.id), content: comment })
    .then(function(response) {
        console.log("댓글 달기 성공");
        console.log(response);
    })
    .catch(function (error) {
    if (error.response) {
      console.log("// 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.");
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    }
    else if (error.request) {
      console.log("// 요청이 이루어 졌으나 응답을 받지 못했습니다.");
      // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
      // Node.js의 http.ClientRequest 인스턴스입니다.
      console.log(error.request);
    }
    else {
      console.log("// 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.");
      console.log('Error', error.message);
    }
    console.log(error.config);
  });

    setComment("");
    setButton({display: false, green: false});
  }

  //해당 카드 지우기
  const deleteCardClick = (card_id) => {

    axios.delete("/api/v1/card/", { id: String(card_id) })
    .then(function(response) {
        console.log("카드 삭제 성공");
    })
    .catch(function (error) {
    if (error.response) {
      console.log("// 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.");
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    }
    else if (error.request) {
      console.log("// 요청이 이루어 졌으나 응답을 받지 못했습니다.");
      // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
      // Node.js의 http.ClientRequest 인스턴스입니다.
      console.log(error.request);
    }
    else {
      console.log("// 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.");
      console.log('Error', error.message);
    }
    console.log(error.config);
  });

    exit();
  }

  //카드의 제목 바꾸기
  const [nameState, setNameState] = useState({name: card.name, edit: false});
  const cardNameChange = (e) => {
    setNameState({...nameState, name: e.target.value});
  }
  const changeName = (card_id, name) => {
    axios.put("/api/v1/card/", { id: card_id, name: name })
    .then(function(response) {
        console.log("카드 제목 바꾸기 성공");
    })
    .catch(function (error) {
    if (error.response) {
      console.log("// 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.");
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    }
    else if (error.request) {
      console.log("// 요청이 이루어 졌으나 응답을 받지 못했습니다.");
      // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
      // Node.js의 http.ClientRequest 인스턴스입니다.
      console.log(error.request);
    }
    else {
      console.log("// 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.");
      console.log('Error', error.message);
    }
    console.log(error.config);
  });

  setNameState({...nameState, edit: false});
  setCardName(nameState.name); // 리스트 화면에 보이는 카드 이름 변경
  }

  //Description 추가 및 변경하기
  const [description, setDescription] = useState({exist: false, content: "", edit: false});
  // 멤버 추가하기
  const addMember = () => {
    alert("[ERROR] NO ACTIVITY PREPARED EXCEPT COMMENTS\n(Failed to add Members)");
  }
  // Due Date 추가하기
  const addDuedate = () => {
    alert("[ERROR] NO ACTIVITY PREPARED EXCEPT COMMENTS\n(Failed to add Due Date)");
  }

  console.log(card);

  return(
    <div id="card-modal-wrapper" onClick={exitIfNotModal}>
      <div id="card-modal-wrapper-2">
        <div className="blank-for-card-modal"/>

        <div id="card-modal">

          <div id="card-modal-top">
            {!(nameState.edit)? <p style={{fontWeight: 700, fontSize: 20}}
            onClick={() => setNameState({...nameState, edit: true})}>
              <br/><br/><br/><br/><br/><br/>{nameState.name}
            </p> : <><br/><br/><br/><br/><br/><br/><input style={{fontWeight: 700, fontSize: 20}} value={nameState.name} onChange={cardNameChange} onBlur={() => nameState.edit? changeName(card.id, nameState.name) : null}/></>}
            <button id="card-modal-x"/>
            <p id="card-modal-listname">in list <span style={{textDecoration: 'underline'}}>{list_name}</span></p>
          </div>


          <div id="card-modal-bottom">
              <div id="card-modal-left" style={{columnWidth: 400}}>
                <p className="title">Description</p>
                {description.exist?                 
                description.edit?
                  <input value={description.content} onChange={(e) => setDescription({...description, content: e.target.value})}/>
                  : <p onClick={() => setDescription({...description, edit: false})}>{description.content}</p>
                : <button onClick={() => setDescription({...description, edit: true})} id="card-modal-add-descrip">Add a more detailed description...</button>}
                <p className="title"><br/>Activity</p>
                <button>Hide Details</button>
                <p>TODO PIC</p>

                <input
                value={comment}
                onChange={changeComment}
                onFocus={() => setButton({...button, display: true})}
                onBlur={(e) => (e.target.value === "") ? setButton({display: false, green: false}) : null}
                id="card-comment"
                placeholder="Write a comment..."/>

                <button
                onClick={saveComment}
                style={{display: button.display? null : 'none', backgroundColor: button.green? 'green' : 'lightgray', color: button.green? 'white' : 'gray'}}>
                  Save
                </button>
                <p>TODO 댓글목록 ul li ...</p>
                {/*카드 액티비티가 undefined라고 뜸 콘솔띄워도 안 뜸 엉엉엉 (card.activities !== [])? card.activities.map((data, index) => (
                  <><Activity data={data} key={index}
                  />
                  <br/></>
                 )) : null*/}
                <button onClick={() => deleteCardClick(card.id)}>Delete Card</button>
              </div>

              <div id="card-modal-right" style={{columnWidth: 200}}>
                <p>SUGGESTED</p>
                <p><br/>ADD TO CARD</p>
                  <button onClick={addMember}>Members</button>
                  <button>Labels</button>
                  <button>Checklist</button>
                  <button onClick={addDuedate}>Due Date</button>
                <p><br/>POWER-UPS</p>
                  <button>+ Add Power-Ups</button>
                  <p>Get unlimited Power-Ups, plus much more.</p>
                  <button>Upgrade Team</button>
                <p><br/>BUTLER <span>NEW</span> <span>TODO</span></p>
                  <button>+ Add Card Button</button>




              </div>
            </div>
        </div>
        
        <div className="blank-for-card-modal"/>

      </div>
    </div>
  )
}

export default CardModal;


/*
                <p><br/>ACTIONS</p>
                  <button>Move</button>
                  <button>Copy</button>
                  <button>Make Template</button>
                  <button>Watch</button>
                  <button>Archive</button>
                  <button>Share</button>
                  */