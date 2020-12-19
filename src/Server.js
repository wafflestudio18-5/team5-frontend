// 백엔드 연동하기 전까지 백엔드 역할을 해 주고,
// 백엔드 연동하고 나서는 백엔드와 프론트 사이 인터페이스가 될 파일

const userData = {
  users: [
    {
      id: 1,
      username: "mina",
      email: "123456789@snu.ac.kr",
      firstname: Twice,
      lastname: Once,
      access_type: "OAUTH",
    },
    {
      id: 2,
      username: "hyunmin",
      email: "123456789@snu.ac.kr",
      firstname: Hyunmin,
      lastname: Woo,
      access_type: "PASSWORD",
    },
  ],
};

export const get = (uri, data) => {
  // 연동하고 나서는
  // return axios.get(uri, data);
  // 로 바꿔야 함
  switch(uri) {
    case '/api/v1/user':
      return userData.users.find((user) => user.id == data.id);
    case '/api/v1/user/userlist':
      return userData.users;
  }
};

export const put = (uri, data) => {
  // 연동하고 나서는
  // return axios.put(uri, data);
  // 로 바꿔야 함
  switch(uri) {
    case 
  }
}