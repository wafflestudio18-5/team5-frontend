import axios from 'axios'

//baseURL 제외한 추가적인 옵션의 경우, 검색해보시면 됩니다.
const requester = axios.create({
	baseURL: "http://ec2-15-164-222-199.ap-northeast-2.compute.amazonaws.com/api/v1/"
})

const apis = {
	user: {
    // user
    get: ({id}) => {
      return requester.get(`user/${id}/`);
    },
    put: ({username}) => {
      return requester.put('user/update/', {
        username
      })
    },

    // 모든 user
    getAll: () => {
      return requester.get('user/list/')
    },
    // 회원가입, pw
		pwSignUp: ({email, password, username, first_name, last_name}) => {
      return requester.post('user/', {
        grantType: "PASSWORD",
        email, password, username, first_name, last_name
      })
    },
    // 회원가입, sc
    scSignUP: ({authProvider, token}) => {
      return requester.post('user/', {
        grantType: "OAUTH",
        authProvider, token
      })
    },
    // 로그인, pw
    pwLogIn: ({email, password}) => {
      console.log({email, password});
      return requester.put('user/login/', {
        grantType: "PASSWORD",
        email, password
      })
    },
    // 로그인, sc
    scLogIn: ({authProvider, token}) => {
      return requester.put('user/login/', {
        grantType: "OAUTH",
        authProvider, token
      })
    },
    // 로그아웃
    logout: () => {
      return requester.put('user/logout/')
    },
	},
	board: {
    // board
    get: ({id, key}) => {
      if(id && key) return null;
      if(id) return requester.get(`board/?key=${id}/`)
      if(key) return requester.get(`board/?key=${key}/`)
    },
		post: ({name}) => {
      return requester.post('board/', {name})
    },
    put: ({id, name, star}) => {
      return requester.put('board/', {id, name, star})
    },
    delete: ({id}) => {
      return requester.delete('board/', {id})
    },

    // all boards
    getAll: () => {
      return requester.get('board/boardlist/')
    },
    // invite user to board
    invite: ({id, username}) => {
      return requester.post('board/invite/', {id, username})
    },
    // get user list in the board
    getUsers: ({board_id}) => {
      return requester.get(`board/userlist/?board_id=${board_id}/`)
    },
  },
  list: {
    post: ({board_id, name}) => {
      return requester.post('list/', {board_id, name})
    },
    put: ({board_id, list_id, name, prev_id}) => {
      return requester.put('list/', {board_id, list_id, name, prev_id})
    },
    delete: ({id}) => {
      return requester.delete('list/', {id})
    },
  },
  card: {
    get: ({id, key}) => {
      if(id && key) return;
      if(key) return requester.get(`card/?key=${key}/`);
      else return requester.get(`card/?id=${id}/`);
    },
    post: ({name, list_id}) => {
      return requester.post('card/', {name, list_id})
    },
    put: ({id, member, name, description, due_date, prev_id, list_id}) => {
      return requester.put('card/', {id, member, name, description, due_date, prev_id, list_id})
    },
    delete: ({id}) => {
      return requester.delete('card/', {id})
    }
  },
  activity: {
    post: ({card_id, content}) => {
      return requester.post('activity/', {card_id, content})
    },
    put: ({id, content}) => {
      return requester.put('activity/', {id, content});
    },
    delete: ({id}) => {
      return requester.delete('activity/', {id})
    },
  }
}

export default apis