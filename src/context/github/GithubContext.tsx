import React, { createContext, useReducer } from 'react';
import { GithubUser, GithubUserRepo } from '../../interfaces/users';
import { githubReducer, Action } from './GithubReducer';

interface GithubContextInterface {
  users: GithubUser[];
  user: GithubUser;
  repos: GithubUserRepo[];
  loading: boolean;
  dispatch: (action: Action) => void;
}

interface GithubProviderProps {
  children?: React.ReactNode;
}

const initialState = {
  users: [],
  user: {} as any as GithubUser,
  repos: [],
  loading: false,
  dispatch: () => {},
};

const GithubContext = createContext<GithubContextInterface>(initialState);

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }: GithubProviderProps) => {
  const [state, dispatch] = useReducer(githubReducer, initialState);

  return (
    <GithubContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
