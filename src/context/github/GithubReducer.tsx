import { GithubUser, GithubUserRepo } from '../../interfaces/users';

interface State {
  users: GithubUser[];
  user: GithubUser;
  repos: GithubUserRepo[];
  loading: boolean;
}

export type Action =
  | { type: 'GET_USERS'; payload: GithubUser[] }
  | {
      type: 'GET_USER_AND_REPO';
      payload: { user: GithubUser; repos: GithubUserRepo[] };
    }
  | { type: 'SET_LOADING' }
  | { type: 'CLEAR_USERS' };

export const githubReducer = (state: State, action: Action) => {
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
    case 'GET_USER_AND_REPO':
      return {
        ...state,
        user: action.payload.user,
        repos: action.payload.repos,
        loading: false,
      };
    default:
      return state;
  }
};
