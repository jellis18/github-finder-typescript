import axios from 'axios';
import React, { createContext, useReducer } from 'react';
import { createDocumentRegistry } from 'typescript';
import { GithubUser, GithubUserRepo } from '../../interfaces/users';
import githubReducer from './GithubReducer';

interface GithubContextInterface {
  users: GithubUser[];
  user: GithubUser;
  repos: GithubUserRepo[];
  loading: boolean;
  searchUsers: (text: string) => void;
  getUser: (login: string) => void;
  clearUsers: () => void;
  getUserRepos: (login: string) => void;
}

interface GithubProviderProps {
  children?: React.ReactNode;
}

const initialState = {
  users: [],
  user: {} as any as GithubUser,
  repos: [],
  loading: false,
  searchUsers: (text: string) => {},
  getUser: (login: string) => {},
  clearUsers: () => {},
  getUserRepos: () => {},
};

const GithubContext = createContext<GithubContextInterface>(initialState);

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }: GithubProviderProps) => {
  const [state, dispatch] = useReducer(githubReducer, initialState);

  const searchUsers = async (text: string) => {
    setLoading();
    const params = new URLSearchParams({ q: text });

    const res = await axios.get<{ items: GithubUser[] }>(
      `${GITHUB_URL}/search/users?${params}`,
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
        },
      }
    );

    const { items } = res.data;

    dispatch({
      type: 'GET_USERS',
      payload: items,
    });
  };

  const getUser = async (login: string) => {
    setLoading();

    const res = await axios.get<GithubUser>(`${GITHUB_URL}/users/${login}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    if (res.status === 404) {
      window.location.href = '/notfound';
    } else {
      const data = res.data;

      dispatch({
        type: 'GET_USER',
        payload: data,
      });
    }
  };

  const getUserRepos = async (login: string) => {
    setLoading();

    const params = new URLSearchParams({ sort: 'created', per_page: '10' });

    const res = await axios.get<GithubUserRepo[]>(
      `${GITHUB_URL}/users/${login}/repos?${params}`,
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
        },
      }
    );

    if (res.status === 404) {
      window.location.href = '/notfound';
    } else {
      const data = res.data;

      dispatch({
        type: 'GET_USER_REPO',
        payload: data,
      });
    }
  };

  const setLoading = () => {
    dispatch({
      type: 'SET_LOADING',
    });
  };

  const clearUsers = () => {
    dispatch({
      type: 'CLEAR_USERS',
    });
  };

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
