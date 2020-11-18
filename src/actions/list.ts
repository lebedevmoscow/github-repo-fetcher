import { Dispatch } from 'redux'
import axios from 'axios'
import {
    LOAD_USER_REPOS, 
    LOAD_USER_REPOS_SUCCESS, 
    LOAD_USER_REPOS_ERROR, 
    ILoadUserRepos, 
    ILoadUserReposError, 
    ILoadUserReposSuccess

} from './../types/list.actions'
import {GITHUB_API_BASE_URL} from './../config'

export const startLoadUserRepos = (username: String): ILoadUserRepos => {
    return {
        type: LOAD_USER_REPOS,
        payload: username
    }
}

export const errorInLoadUserRepos = (error: string): ILoadUserReposError => {
    return {
        type: LOAD_USER_REPOS_ERROR,
        payload: error
    }
}

export const successLoadUserRepos = (data: Array<Object>): ILoadUserReposSuccess => {
    return {
        type: LOAD_USER_REPOS_SUCCESS,
        payload: data
    }
}

export const loadUserRepos = (slug: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(startLoadUserRepos(slug))
        try {
            const req: Array<Object> | any = await axios.get(`${GITHUB_API_BASE_URL}/users/${slug}/repos`)
            dispatch(successLoadUserRepos(req.data))
        } catch(e) {
            dispatch(errorInLoadUserRepos('This user does not exist'))
            console.log('Cannot load user repos in current time, ', e.message || e)
        }
    }
}