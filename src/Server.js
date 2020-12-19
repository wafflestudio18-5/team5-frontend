// 백엔드 연동하기 전까지 백엔드 역할을 해 주고,
// 백엔드 연동하고 나서는 백엔드와 프론트 사이 인터페이스가 될 파일
// 이야 진짜 끔찍하다 코드

import axios from "axios";
const host = "http://localhost:4000";

export const get = async (uri, data) => {
  let response;
  switch (uri) {
    case "/api/v1/user":
    case "/api/v1/user/userlist":
      // 유저는 로그인이 연결돼있다보니까 json-server로는 한계가 있군요.. 포기
      break;
    case "/api/v1/board/boardlist":
      response = await axios.get(`${host}/boards`);
      return response.data;
    case "/api/v1/board":
      let id = data.id;
      if (data.key) {
        id = await get("/api/v1/board/boardlist", null);
        id = id.find((item) => item.key === data.key).id;
      }
      response = await axios.get(`${host}/boards/${id}`);
      return response.data;
    default:
      console.log("wrong uri");
  }
};

export const put = async (uri, data) => {
  switch (uri) {
  }
};

export const post = async (uri, data) => {
  let response;
  let ids;
  switch (uri) {
    case "/api/v1/board":

      response = await axios.get(`${host}/ids`);
      ids = response.data;
      ids.nboards++;
      await axios.put(`${host}/ids`, ids);

      const newBoard = {
        key: `boardkey${ids.nboards}`,
        name: data.name,
        lists: [],
      };
      await axios.post(`${host}/boards`, newBoard);
      break;
    case '/api/v1/list':
      
      response = await axios.get(`${host}/ids`);
      ids = response.data;
      ids.nlists++;
      await axios.put(`${host}/ids`, ids);

      response = await axios.get(`${host}/boards/${data.board_id}`);
      const board = response.data;
      console.log(board);
      board.lists = [
        ...board.lists,
        {
          id: ids.nlists,
          name: data.name,
          cards: []
        }
      ]
      await axios.put(`${host}/boards/${data.board_id}`, board);

      console.log(board);
    default:
      break;
  }
};
