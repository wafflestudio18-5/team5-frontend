import React from 'react';

function Activity({data}) {
    return (
        <div className="Activity">
            <img src="" alt={String(data.id)}/> {/*TODO 프사설정*/}
            <nobr/>
            {data.is_comment ? <p>{data.content}</p> : null}
            {/* TODO 댓글이 아닐 경우 다른 방식으로... */}
        </div>
    )
}

export default Activity;