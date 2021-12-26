import axios from 'axios';
import { GithubUser, GithubUserRepo } from '../../interfaces/users';

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

const githubApi = axios.create({
  baseURL: GITHUB_URL,
  headers: {
    Authorization: `token ${GITHUB_TOKEN}`,
  },
});

export const searchUsers = async (text: string) => {
  const params = new URLSearchParams({ q: text });

  const res = await githubApi.get<{ items: GithubUser[] }>(
    `/search/users?${params}`
  );

  const { items } = res.data;

  return items;
};

export const getUserAndRepos = async (login: string) => {
  const [user, repos] = await Promise.all([
    githubApi.get<GithubUser>(`/users/${login}`),
    githubApi.get<GithubUserRepo[]>(`/users/${login}/repos`),
  ]);
  return { user: user.data, repos: repos.data };
};
