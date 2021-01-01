import React, {useState} from 'react';

function Activity({data, board_id, card_id}) {

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
    const putCommentClick = () => {
        setButton({...button, editMode: false})
        putComment(changedComment, data.id)
        setChangedComment("");
    }

    const deleteCommentClick = () => {
        deleteComment(data.id);
    }
    return (
        <div className="Activity">
            <img src="" alt={String(data.id)}/> {/*TODO 프사설정*/}
            <nobr/>
            {data.is_comment ? <>
            {button.editMode
                ? <>
                    <input
                    value={changedComment}
                    onChange={commentChange}
                    onBlur={(e) => (e.target.value === "" || e.targtet.value === data.content) ? setButton({editMode: false, green: false}) : null}
                    id="card-comment"
                    placeholder="Edit your comment..."/>

                    <button
                    onClick={putCommentClick}
                    style={{backgroundColor: button.green? 'green' : 'lightgray', color: button.green? 'white' : 'gray'}}>
                    Save
                    </button></>
                : <><p>{data.content}</p>
                <button className="ActivityCommentModify" onClick={() => setButton({...button, editMode: true})}>edit</button>
                <button className="ActivityCommentModify" onClick={deleteCommentClick}>delete</button>
            </>}
            </> : null}
            {/* TODO 댓글이 아닐 경우 다른 방식으로... */}
        </div>
    )
}

export default Activity;