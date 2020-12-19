// 백엔드 연동하기 전까지 백엔드 역할을 해 주고,
// 백엔드 연동하고 나서는 백엔드와 프론트 사이 인터페이스가 될 파일

import axios from "axios";
const host = 'http://localhost:4000';


export const get = async (uri, data) => {
  let response;
  switch(uri) {
    case '/api/v1/user': case '/api/v1/user/userlist':
      // 유저는 로그인이 연결돼있다보니까 json-server로는 한계가 있군요.. 포기
      break;
    case '/api/v1/board/boardlist':
      response = await axios.get(`${host}/boards`);
      return response.data;
    case '/api/v1/board':
      response = await axios.get(`${host}/boards/${data.id}`);
      return response.data;
    default:
      console.log('wrong uri');
  }
};

export const put = (uri, data) => {
  switch(uri) {
    
  }
}

export const post = (uri, data) => {
  
}