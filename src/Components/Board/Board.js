import './Board.css';
import List from './List.js';

function Board({data}) { // TODO: 테스트 위해 아래에 임의로 DATA를 만들것임
  // TODO: props는 data를 가지고 있어야 하며 이 data object에 lists라는 array가 있다고 가정.
  // TODO: lists의 안에 [[card, card, card], [card, card]] 와 같이 여러 개의 card로 구성된 list들이 있다고 가정

  const DATA = {
    board_name: data.board_name,
    board_code: data.board_code,

    listnames: ['회의 일정', '페이지들', '세번째리스트', '팀원 목록', '구분', '여섯번째리스트', '일곱번째리스트', '여덟번째리스트', '아홉째리스트'],

    lists: [
      [{card_name: 'Sprint 1'}, {card_name: 'Scrum 11/26'}, {card_name: 'Sprint 2'}, {card_name: 'Sprint 3'}, {card_name: 'Sprint 4'}],
      [{card_name: 'Board'}, {card_name: 'Boards'}, {card_name: 'login'}, {card_name: 'signup'}, {card_name: 'root'}, {card_name: '+templates'}, {card_name: '+settings'}, {card_name: '+members'},  {card_name: '???'},  {card_name: '와플조아'},  {card_name: '와플조아'},  {card_name: '와플조아'}],
      [{card_name: '카드예시'}, {card_name: '다다르게할수있답니당'}, {card_name: '갑자기 카드이름이 아주아주 길어지면 어떻게될지 궁금해졌다'}, {card_name: '별 문제가 없는 것으로 판명되었다'}, {card_name: '룰룰루'}, {card_name: '와플조아'}, {card_name: '와플최고'}, {card_name: '와플와플와플'},  {card_name: '와플조아'}], 
      [{card_name: '우현민(프론트엔드)'}, {card_name: '정민수(서버)'}, {card_name: '정대용(서버)'}, {card_name: '이세원(서버)'}, {card_name: '김유진(프론트엔드)'}],
      [{card_name: '프론트엔드'}, {card_name: '백엔드'}],
      [{card_name: '카드1번째'}, {card_name: '카드두번쨰'}, {card_name: '카드3번째'}, {card_name: '카드4번쨰'}, {card_name: '카드5번째'}, {card_name: '카드6번쨰'}, {card_name: '카드7번째'}, {card_name: '카드8번쨰'}],
      [{card_name: '카드하나'}, {card_name: '카드둘'}, {card_name: '와플조아'}], 
      [{card_name: '카드하나'}, {card_name: '카드둘'}],
    ]
  };
  
  return(
    <div id="Board-wrapper">
        
      <div id="board-header">

        <div id="board-header-left">
          <select name="language" defaultValue="English (US)">
          <option value="Board">Board</option>
          <option value="Calendar">Calendar</option>
          <option value="Map">Map</option>
          </select>
          <h3 id="board-name">{data.board_name}</h3>
          <button id="board-header-star">☆</button>
          <div className="board-header-vertical-line"/>
          <button>{data.board_name}<span id="board-header-freeboard">Free</span></button>
          <div className="board-header-vertical-line"/>
          <button>Private</button>
          <div className="board-header-vertical-line"/>
          <div id="board-profile-images"><p>프사들동글동글</p></div>
          <button>Invite</button>
        </div>
      
        <div id="board-header-right">
          <button>Calendar</button>
          <button>Butler</button>
          <button>Show Menu</button>
        </div>

      </div>

      <div id="board-main"><div id="board-lists">
        {DATA.lists.map((list, index) => (<List listname={DATA.listnames[index]} list={list} key={index} />))}
        <button id="board-addlist"><span id="board-addlist-plus">+</span>Add another list</button>
      </div></div>

    </div>
  )
}

export default Board;
