import React, {useState, useRef} from 'react';
import axios from 'axios';

function Activity({data}) {

    const inputRef = useRef();

    const [changedComment, setChangedComment] = useState(data.content);
    const [button, setButton] = useState({editMode: false, green: true})

    const deleteActivity = (id) => {
        axios.delete("/api/v1/activity/", { id: String(id) })
        .then(function(response) {
            console.log("댓글 지우기 성공");
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
    }

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
        setButton({...button, editMode: false})
        axios.put("/api/v1/activity/", { content: changedComment, id: String(data.id) })
        .then(function(response) {
            console.log("댓글 수정 성공");
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
                    onClick={putComment}
                    style={{backgroundColor: button.green? 'green' : 'lightgray', color: button.green? 'white' : 'gray'}}>
                    Save
                    </button></div>
                <div style={button.editMode? {display: 'none'} :null}><p>{data.content}</p>
                <button className="ActivityCommentModify" onClick={editCommentClick}>edit</button>
                <button className="ActivityCommentModify" onClick={() => deleteActivity(data.id)}>delete</button>
            </div>
            </> : null}
            {/* TODO 댓글이 아닐 경우 다른 방식으로... */}
        </div>
    )
}

export default Activity;