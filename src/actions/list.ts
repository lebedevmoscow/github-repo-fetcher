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
import {IListProperties} from './../reducers/list'

interface IReq {
    data: Object
}

interface IRes {
    repos: IListProperties[],
    currentPage: Number
}

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

export const successLoadUserRepos = (data: IRes): ILoadUserReposSuccess => {
    return {
        type: LOAD_USER_REPOS_SUCCESS,
        payload: data
    }
}

export const loadUserRepos = (slug: string, page = 1) => {
    return async (dispatch: Dispatch) => {
        console.log('here')
        dispatch(startLoadUserRepos(slug))
        try {
            const req: Array<IReq> | any = await axios.get(`${GITHUB_API_BASE_URL}/orgs/${slug}/repos?page=${page}&per_page=12`)
            const res: IRes = {
                repos: req.data,
                currentPage: page
            }
            console.log('res', res)

            dispatch(successLoadUserRepos(res))
        } catch(e) {
            dispatch(errorInLoadUserRepos('This user does not exist'))
            console.log('Cannot load user repos in current time, ', e.message || e)
        }
    }
}