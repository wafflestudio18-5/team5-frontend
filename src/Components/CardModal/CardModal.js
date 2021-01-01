import React, {useState} from 'react';
import './CardModal.css';
import Activity from './Activity.js';

function CardModal({card_key, card, exit, board_id}) {

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

  /*postComment 가져와야함*/
  const postComment = ({card_id, comment}) => {
    //POST/api/v1/activity/
    console.log("Post comment " + String(comment) + "  CARD ID : " + String(card_id));
  }
  const saveComment = () => {
    postComment(card.id, comment);
    setComment("");
    setButton({display: false, green: false});
  }

  function deleteCard(card_id) {
    /*TODO DELETE  /api/v1/card/ */
    console.log("Delete Card");
    exit();
  }

  //카드의 제목 바꾸기
  const [nameState, setNameState] = useState({name: card.name, edit: false});
  const changeName = (card_id, name) => {
    /*TODO PUT /api/v1/card/ */
  }
  //Description 추가 및 변경하기
  const [description, setDescription] = useState({exist: false, content: "", edit: false});
  // 멤버 추가하기
  const addMember = () => {
    console.log("addmember TODO");
  }
  // Due Date 추가하기
  const addDuedate = () => {
    console.log("ADDDUDATE TODO");
  }

  return(
    <div id="card-modal-wrapper" onClick={exitIfNotModal}>
      <div id="card-modal-wrapper-2">
        <div className="blank-for-card-modal"/>

        <div id="card-modal" onClick={console.log("modal!")}>

          <div id="card-modal-top">
            {nameState.edit? <h3 
            onClick={() => setNameState({...nameState, edit: true})}>
              <br/><br/><br/>{card.name}
            </h3> : <input value={nameState.name} onChange={(e) => setNameState({...nameState, name: e.target.value})} onBlur={changeName(card.id, nameState.name)}/>}
            <button id="card-modal-x"/>
            <p id="card-modal-listname">in list /*TODO listname*/</p>
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
                {card.activities.map((data, index) => (
                  <><Activity data={data} key={index} board_id={board_id} card_id={card.id}/>
                  <br/></>
                 ))}
                <button onClick={() => deleteCard(card.id)}>Delete Card</button>
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