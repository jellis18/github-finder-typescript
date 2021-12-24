export interface GithubUser {
  id: number;
  login: string;
  avatar_url: string;
  name: string;
  type: string;
  hireable: boolean;
  bio: string;
  html_url: string;
  location: string;
  blog: string;
  twitter_username: string;
  followers: number;
  following: number;
  public_repos: number;
  public_gists: number;
}

export interface GithubUserRepo {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  html_url: string;
  description: string;
  watchers_count: number;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
}
