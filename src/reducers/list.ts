import {IActionObject} from './../interfaces/IReducers'
import {LOAD_USER_REPOS, LOAD_USER_REPOS_SUCCESS, LOAD_USER_REPOS_ERROR} from './../types/list.actions'

/// Data from Github API
export interface IListProperties {
    name: string,
    html_url: string,
    description: string,
    stargazers_count: number,
    language: string,
    forks: number,
    watchers_count: number,
    created_at: string
}

export interface IListReducer {
    // All repos from this user
    repos: Array<IListProperties>,
    loading: Boolean,
    // If account is not exist or Github Server has down
    error: null | string,
    // Search by
    username: null | string,
    currentPage: number
}

const initialState: IListReducer = {
    repos: [],
    loading: false,
    error: null,
    username: null,
    currentPage: 1
}


const listReducer = (state = initialState, action: IActionObject): IListReducer => {
    switch(action.type) {
        case LOAD_USER_REPOS:
            return {...state, loading: true, error: null, username: action.payload}
        case LOAD_USER_REPOS_SUCCESS:
            return {
                ...state, 
                loading: false, 
                error: null, 
                repos: action.payload.repos, 
                currentPage: action.payload.currentPage
            }
        case LOAD_USER_REPOS_ERROR:
            return {...state, loading: false, error: action.payload}
        default:
            return state
    }
}

export default listReducer