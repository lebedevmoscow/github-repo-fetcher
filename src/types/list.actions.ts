export const LOAD_USER_REPOS: string = 'LOAD_USER_REPOS'
export const LOAD_USER_REPOS_SUCCESS: string = 'LOAD_USER_REPOS_SUCCESS'
export const LOAD_USER_REPOS_ERROR: string = 'LOAD_USER_REPOS_ERROR'

export interface ILoadUserRepos {
	type: typeof LOAD_USER_REPOS,
	payload: String
}

export interface ILoadUserReposSuccess {
	type: typeof LOAD_USER_REPOS_SUCCESS;
	payload: Array<Object>;
}

export interface ILoadUserReposError {
	type: typeof LOAD_USER_REPOS_ERROR;
	payload: String;
}

export type ListTypes = ILoadUserRepos | ILoadUserReposSuccess | ILoadUserReposError 

export default ListTypes
