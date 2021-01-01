import React, {useState, useRef} from 'react';

function Activity({data, board_id, card_id}) {

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

    /*TODO*/
    function putComment(content, id) {
        //PUT /api/v1/activity/
        console.log("PUT");
    }
    /* TODO */
    function deleteComment(id) {
        // DELETE /api/v1/activity/
        console.log("DELETE");
    }

    const editCommentClick = () => {
        setButton({...button, editMode: true});
        inputRef.current.focus();
    }
    const putCommentClick = () => {
        setButton({...button, editMode: false})
        putComment(changedComment, data.id)
    }

    const deleteCommentClick = () => {
        deleteComment(data.id);
    }
    return (
        <div className="Activity">
            <img src="" alt={String(data.id)}/> {/*TODO 프사설정*/}
            <nobr/>
            {data.is_comment ? <>
                <div style={button.editMode? null : {display: 'none'}}>
                    <input
                    ref={inputRef}
                    value={changedComment}
                    onChange={commentChange}
                    onBlur={(e) => (e.target.value === "" || e.target.value === data.content) ? setButton({...button, editMode: false}) : null}
                    id="card-comment"
                    placeholder="Edit your comment..."/>

                    <button
                    onClick={putCommentClick}
                    style={{backgroundColor: button.green? 'green' : 'lightgray', color: button.green? 'white' : 'gray'}}>
                    Save
                    </button></div>
                <div style={button.editMode? {display: 'none'} :null}><p>{data.content}</p>
                <button className="ActivityCommentModify" onClick={editCommentClick}>edit</button>
                <button className="ActivityCommentModify" onClick={deleteCommentClick}>delete</button>
            </div>
            </> : null}
            {/* TODO 댓글이 아닐 경우 다른 방식으로... */}
        </div>
    )
}

export default Activity;