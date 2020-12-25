import React from 'react';
import './CardModal.css';

function CardModal({card_key, card_id, card_name, exit}) {

  const exitIfNotModal = (e) => {
    if (e.target.id.includes("card-modal-wrapper") || e.target.className === "blank-for-card-modal" || e.target.id === "card-modal-x") {
      exit();
    }
  }

  return(
    <div id="card-modal-wrapper" onClick={exitIfNotModal}>
      <div id="card-modal-wrapper-2">
        <div className="blank-for-card-modal"/>

        <div id="card-modal" onClick={console.log("modal!")}>

          <div id="card-modal-top">
            <h3>{card_name}<br/><br/><button id="card-modal-x">X</button></h3>
            <p>in list /*TODO listname*/</p>
          </div>

          <div id="card-modal-bottom"/>        

        </div>
        
        <div className="blank-for-card-modal"/>

      </div>
    </div>
  )
}

export default CardModal;


          <div id="card-modal-bottom">
              <div id="card-modal-left" style={{columnWidth: 400}}>
                <h4>Description</h4>
                <p>Add a more detailed description...</p>
                <h4>Activity</h4>
                <button>Hide Details</button>
                <p>TODO PIC</p><input placeholder="Write a comment..."/>
                <p>TODO 댓글목록 ul li ...</p>
              </div>

              <div id="card-modal-right" style={{columnWidth: 200}}>
                <p>SUGGESTED</p>
                  <button>톱니TODO</button>
                <p>ADD TO CARD</p>
                  <button>Members</button>
                  <button>Labels</button>
                  <button>Checklist</button>
                  <button>Due Date</button>
                  <button>Attachment</button>
                  <button>Cover</button>
                <p>POWER-UPS</p>
                  <button>+ Add Power-Ups</button>
                  <p>Get unlimited Power-Ups, plus much more.</p>
                  <button>Upgrade Team</button>
                <p>BUTLER <span>NEW</span><span>INFO TODO</span></p>
                  <button>+ Add Card Button</button>
                <p>ACTIONS</p>
                  <button>Move</button>
                  <button>Copy</button>
                  <button>Make Template</button>
                  <button>Watch</button>
                  <button>Archive</button>
                  <button>Share</button>
              </div>
            </div>