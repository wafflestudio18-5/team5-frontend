import React, {useState, useRef} from 'react';
import apis from '../../Library/Apis';

function Activity({data, refresh, setRefresh, postActivity, putActivity, deleteActivity}) {

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
        putActivity(String(data.id), changedComment);
    }

    const inputBlur = (e) => {
        if (e.target.value === "" || e.target.value === data.content) {
            setButton({...button, editMode: false});
            setChangedComment(data.content);
        }
    }

    return (
        <div className="Activity" style={{display: 'flex', flexDirection: 'row', marginTop: 5, marginBottom: 5}}>
            <img style={{height: 35, width: 35, borderRadius: '50%', marginBottom: 15, marginRight: 10, position: 'relative', top: 10, left: 2}} src="https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg" alt={String(data.id)}/> {/*TODO 프사설정*/}
            {data.is_comment ?
        
                <><div style={button.editMode? null : {display: 'none'}}>
                    <input
                        style={{fontSize: 14, border: '1px transparent solid', outline: 'none', filter: 'brightness(100%)'}}
                        ref={inputRef}
                        value={changedComment}
                        onChange={commentChange}
                        onBlur={inputBlur}
                        placeholder="Edit your comment..."/>

                    <button
                        onClick={putComment}
                        style={{backgroundColor: button.green? 'green' : 'lightgray', color: button.green? 'white' : 'gray'}}>
                    Save
                    </button>
                </div>

                <div style={button.editMode? {display: 'none'} : null}>
                    <p>
                        <span style={{fontWeight: 600, color: 'black', fontSize: 15}}>{data.creator} </span>
                        <span style={{color: 'gray', fontsize: 12}}>    {data.created_at.replace("T", "  ").replace("Z", "")}</span></p>
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
                </div></>

            :   <p>
                    <span style={{fontWeight: 600, color: 'black', fontSize: 15, width: 'fit-content'}}>{data.creator} </span>
                    {data.content}
                    <br/>
                    <span style={{color: 'gray', fontsize: 12, marginTop: 5}}>    {data.created_at.replace("T", "  ").replace("Z", "")}</span>
                </p>}
            {/* TODO 댓글이 아닐 경우 다른 방식으로... */}
        </div>
    )
}

export default Activity;