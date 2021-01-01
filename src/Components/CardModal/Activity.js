import React from 'react';

function Activity({data}) {
    return (
        <div className="Activity">
            <img src="https://cdn.ftoday.co.kr/news/photo/201803/86020.jpg" alt="Profile"/>
            <nobr/>
            {data.is_comment ? <p>{data.comment}</p> : null}
            {/* TODO 댓글이 아닐 경우 다른 방식으로... */}
        </div>
    )
}