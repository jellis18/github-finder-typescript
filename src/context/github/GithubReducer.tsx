import { GithubUser, GithubUserRepo } from '../../interfaces/users';

interface State {
  users: GithubUser[];
  user: GithubUser;
  repos: GithubUserRepo[];
  loading: boolean;
}

type Action =
  | { type: 'GET_USERS'; payload: GithubUser[] }
  | { type: 'GET_USER'; payload: GithubUser }
  | { type: 'GET_USER_REPO'; payload: GithubUserRepo[] }
  | { type: 'SET_LOADING' }
  | { type: 'CLEAR_USERS' };

const githubReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'GET_USERS':
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: true,
      };
    case 'CLEAR_USERS':
      return {
        ...state,
        users: [],
        loading: false,
      };
    case 'GET_USER':
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case 'GET_USER_REPO':
      return {
        ...state,
        repos: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default githubReducer;
