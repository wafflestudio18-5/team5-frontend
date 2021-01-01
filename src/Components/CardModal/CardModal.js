import React from 'react';
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


  return(
    <div id="card-modal-wrapper" onClick={exitIfNotModal}>
      <div id="card-modal-wrapper-2">
        <div className="blank-for-card-modal"/>

        <div id="card-modal" onClick={console.log("modal!")}>

          <div id="card-modal-top">
            <h3>{card.name}<button id="card-modal-x"/></h3>
            <p id="card-modal-listname">in list /*TODO listname*/</p>
          </div>


          <div id="card-modal-bottom">
              <div id="card-modal-left" style={{columnWidth: 400}}>
                <p className="title">Description</p>
                <button id="card-modal-add-descrip">Add a more detailed description...</button>
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