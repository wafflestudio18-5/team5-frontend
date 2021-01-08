import React, {useState, useRef} from 'react';
import apis from '../../Library/Apis';

function Activity({data, getCard, putActivity, deleteActivity, detail}) {

    const inputRef = useRef();

    const [changedComment, setChangedComment] = useState(data.content);
    const [button, setButton] = useState({editMode: false, green: true})

    const commentChange = (e) => {
        setChangedComment(e.target.value);
        if (e.target.value === "") {
            setButton({...button, green: false});
        }
        else {
            setButton({...button, green: true});
        }
    }

    const editCommentClick = () => {
        setButton({...button, editMode: true});
        inputRef.current.focus();
    }
    
    const putComment = () => {
        setButton({...button, editMode: false});
        if (!button.green) {
            setChangedComment(data.content);
            return;
        }
        putActivity(changedComment, String(data.id));
        getCard();
    }

    const inputBlur = (e) => {
        if (e.target.value === "" || e.target.value === data.content) {
            setButton({green: false, editMode: false});
            setChangedComment(data.content);
        }
    }

    return (
        <div className="Activity" style={{display: 'flex', flexDirection: 'row', marginTop: 5, marginBottom: 5}}>
            {(data.is_comment || detail) ? <img style={{height: 35, width: 35, borderRadius: '50%', marginBottom: 15, marginRight: 10, position: 'relative', top: 10, left: 2}} src="https://assets.leetcode.com/users/bundhoo/avatar_1527798889.png" alt={String(data.id)}/> : null}
            {data.is_comment ?
        
                <><div style={button.editMode? null : {display: 'none'}}>
                <p>
                    <span style={{fontWeight: 600, color: 'black', fontSize: 15}}>{data.creator} </span>
                    <span style={{color: 'gray', fontsize: 12}}>    {data.created_at}</span></p>
                <div style={{
                  backgroundColor: 'white', 
                  padding: 3, 
                  paddingLeft: 8,
                  paddingBottom: 0,
                  border: '1.5px lightgray solid',
                  borderRadius: 3,
                  marginBottom: 5,
                  display: 'flex',
                  flexDirection: 'column'
                  }}>
                    <input
                        style={{fontSize: 14, 
                        border: '1px transparent solid', 
                        outline: 'none', 
                        paddingTop: 6,
                        paddingLeft: 0,
                        width: 413,
                        fontSize: 15,
                        filter: 'brightness(100%)', background: 'white'}}
                        ref={inputRef}
                        value={changedComment}
                        onChange={commentChange}
                        onBlur={inputBlur}
                        placeholder="Edit your comment..."/>

                    <div style={{display: 'float'}}>
                        <button
                            onClick={putComment}
                            style={{
                            backgroundColor: button.green ? "#5AAC44" : "lightgray",
                            color: button.green ? "white" : "gray",
                            marginTop: 7,
                            marginBottom: 10,
                            width: 50,
                            height: 30,
                            position: 'relative',
                            left: 3
                            }}>
                        Save
                        </button>
                        <button onClick={inputBlur} style={{ float: 'right', display: 'inline-block' }} className="card-modal-x">×</button>
                    </div>
                </div></div>

                <div style={button.editMode? {display: 'none'} : null}>
                    <p>
                        <span style={{fontWeight: 600, color: 'black', fontSize: 15}}>{data.creator} </span>
                        <span style={{color: 'gray', fontsize: 12}}>    {data.created_at}</span></p>
                    <div style={{              
                        backgroundColor: 'white', 
                        padding: 4, 
                        border: '1.5px lightgray solid',
                        borderRadius: 3,
                        marginBottom: 0,
                        width: 'fit-content'}}>
                        <p style={{fontSize: 15}}>{changedComment}</p>
                    </div>
                    <button className="ActivityCommentModify" onClick={editCommentClick}>Edit</button>
                    <span> · </span>
                    <button className="ActivityCommentModify" onClick={() => deleteActivity(data.id)}>Delete</button>
                </div>
                </>

            :  (detail? <p style={{position: 'relative', top: 3}}>
                    <span style={{fontWeight: 600, color: 'black', fontSize: 15, width: 'fit-content'}}>{data.creator} </span>
                    <span style={{fontSize: 15}}>{data.content}</span>
                    <br/>
                    <span style={{color: 'gray', fontsize: 12, position: 'relative', top: 4}}>    {data.created_at}</span>
                </p>:null)}
            {/* TODO 댓글이 아닐 경우 다른 방식으로... */}
        </div>
    )
}

export default Activity;