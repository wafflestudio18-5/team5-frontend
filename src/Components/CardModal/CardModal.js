import React from 'react';
import './CardModal.css';

function CardModal({card_key, card_id, card_name, exit, postComment}) {

  const exitIfNotModal = (e) => {
    if (e.target.id.includes("card-modal-wrapper") || e.target.className === "blank-for-card-modal" || e.target.id === "card-modal-x") {
      exit();
    }
  }

  const [button, setButton] = React.useState(false);
  const [greenButton, setGreenButton] = React.useState(false);
  const [comment, setComment] = React.useState("");

  const commentChange = (e) => {
    setComment(e.target.value);
    if (e.target.value === "") {
      setGreenButton(false);
    } else {
      setButton(true);
      setGreenButton(true);
    }
  }

  const saveComment = () => {
    postComment(card_key, card_id, comment);
    setComment('');
    setButton(false);
    setGreenButton(false);
  }

  return(
    <div id="card-modal-wrapper" onClick={exitIfNotModal}>
      <div id="card-modal-wrapper-2">
        <div className="blank-for-card-modal"/>

        <div id="card-modal">

          <div id="card-modal-top">
            <h3>{card_name}<button id="card-modal-x"/></h3>
            <p id="card-modal-listname">in list /*TODO listname*/</p>
          </div>


          <div id="card-modal-bottom">
              <div id="card-modal-left" style={{columnWidth: 400}}>
                <p className="title">Description</p>
                <button id="card-modal-add-descrip">Add a more detailed description...</button>
                <p className="title"><br/>Activity</p>
                <button>Hide Details</button>
                <p>TODO PIC</p>
                <div id="card-comment-box">
                  <input id="card-comment" onFocus={(e) => setButton(true)} onBlur={(e) => (e.target.value === "")? setButton(false) : {}} placeholder="Write a comment..." value={comment} onChange={commentChange}/>
                    <br/>
                  <button 
                  style={button? greenButton? {backgroundColor: '#5AAC44', color: 'white'} : {color: 'gray'} : {display: 'none'}} 
                  id="card-comment-save" 
                  onClick={saveComment}>Save</button>
                </div>

                <div id="card-comments">
                </div>

              </div>

              <div id="card-modal-right" style={{columnWidth: 200}}>
                <p>SUGGESTED</p>
                <p><br/>ADD TO CARD</p>
                  <button>Members</button>
                  <button>Labels</button>
                  <button>Checklist</button>
                  <button>Due Date</button>
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