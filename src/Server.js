// 백엔드 연동하기 전까지 백엔드 역할을 해 주고,
// 백엔드 연동하고 나서는 백엔드와 프론트 사이 인터페이스가 될 파일

export const get = (uri, data) => {
  const allData = axios.get('/api/v1/');
  switch(uri) {
    case '/api/v1/user/':
      return userData.users.find((user) => user.id == data.id);
    case '/api/v1/user/userlist/':
      return userData.users;
    case '/api/v1/board/boardlist/':
      return boardData.boards;
  }
};

export const put = (uri, data) => {
  // 연동하고 나서는
  // return axios.put(uri, data);
  // 로 바꿔야 함
  switch(uri) {
    
  }
}