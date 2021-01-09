import axios from "axios";

const requester = axios.create({
  baseURL:
    "http://ec2-15-164-222-199.ap-northeast-2.compute.amazonaws.com/api/v1/",
});

requester.defaults.xsrfCookieName = "csrftoken";
requester.defaults.xsrfHeaderName = "X-CSRFTOKEN";

const apis = {
  user: {
    // user
    get: ({ id }) => {
      return requester.get(`user/${id}/`);
    },
    put: ({ username }) => {
      return requester.put("user/update/", {
        username,
      });
    },

    setToken: (token) => {
      requester.defaults.headers.common["Authorization"] = `Token ${token}`;
    },

    // 모든 user
    getAll: () => {
      return requester.get("user/list/");
    },
    // 회원가입, pw
    pwSignUp: ({ email, password, username, first_name, last_name }) => {
      return requester.post("user/", {
        grantType: "PASSWORD",
        email,
        password,
        username,
        first_name,
        last_name,
      });
    },
    // 회원가입, sc
    scSignUP: ({ authProvider, token }) => {
      return requester.post("user/", {
        grantType: "OAUTH",
        authProvider,
        token,
      });
    },
    // 로그인, pw
    pwLogIn: ({ email, password }) => {
      return requester.put("user/login/", {
        grantType: "PASSWORD",
        email,
        password,
      });
    },
    // 로그인, sc
    scLogIn: ({ authProvider, token }) => {
      return requester.put("user/login/", {
        grantType: "OAUTH",
        authProvider,
        token,
      });
    },
    // 로그아웃
    logout: () => {
      requester.defaults.headers.common["Authorization"] = null;
      return requester.put("user/logout/");
    },
  },
  board: {
    // board
    getById: ({ id }) => {
      return requester.get(`board/?id=${id}`);
    },
    getByKey: ({key}) => {
      return requester.get(`board/?key=${key}`);
    },
    post: ({ name }) => {
      return requester.post("board/", { name });
    },
    put: ({ id, name, star }) => {
      return requester.put("board/", { id, name, star });
    },
    delete: ({ id }) => {
      return requester.delete("board/", {data: { id }});
    },

    // all boards
    getAll: () => {
      return requester.get("board/boardlist/");
    },
    // invite user to board
    invite: ({ id, username }) => {
      return requester.post("board/invite/", { id, username });
    },
    // get user list in the board
    getUsers: ({ board_id }) => {
      return requester.get(`board/userlist/?board_id=${board_id}`);
    },
  },
  list: {
    post: ({ board_id, name }) => {
      return requester.post("list/", { board_id, name });
    },
    put: ({ board_id, list_id, name, prev_id }) => {
      return requester.put("list/", { board_id, list_id, name, prev_id });
    },
    delete: ({ id }) => {
      return requester.delete("list/", { data: { id } });
    },
  },
  card: {
    getById: ({ id }) => {
      return requester.get(`card/?id=${id}`);
    },
    getByKey: ({ key }) => {
      return requester.get(`card/?key=${key}`);
    },
    post: ({ name, list_id }) => {
      return requester.post("card/", { name, list_id });
    },
    put: ({ id, member, name, description, due_date, prev_id, list_id }) => {
      return requester.put("card/", {
        id,
        member,
        name,
        description,
        due_date,
        prev_id,
        list_id,
      });
    },
    delete: ({ id }) => {
      return requester.delete("card/", {data: { id }});
    },
  },
  activity: {
    post: ({ card_id, content }) => {
      return requester.post("activity/", { card_id, content });
    },
    put: ({ id, content }) => {
      return requester.put("activity/", { id, content });
    },
    delete: ({ id }) => {
      return requester.delete("activity/", {data: { id }});
    },
  },
};

export default apis;
