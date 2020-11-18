import {IActionObject} from './../interfaces/IReducers'
import {LOAD_USER_BIO, LOAD_USER_BIO_ERROR, LOAD_USER_BIO_SUCCESS} from './../types/bio.actions'

// Data from API Github
export interface IBioProperties {
    login: string,
    avatar_url: string,
    html_url: string,
    followers: number,
    following: number,
    created_at: string,
    public_repos: number,
    bio: string,
    location: string,
    blog: string,
    company: string,
    type: string,
    name: string
}

export interface IBioReducer {
    // Data from API
    data: null | IBioProperties,
    loading: Boolean,
    // If account is not exist or Github Server has down
    error: null | String,
    // Search by
    username: null | String
}

const initialState: IBioReducer = {
    data: null,
    loading: false,
    error: null,
    username: null
}

const bioReducer = (state = initialState, action: IActionObject): IBioReducer => {
    switch(action.type) {
        case LOAD_USER_BIO:
            return {...state, loading: true, error: null, username: action.payload}
        case LOAD_USER_BIO_SUCCESS:
            return {...state, loading: false, error: null, data: action.payload}
        case LOAD_USER_BIO_ERROR:
            return {...state, loading: false, error: action.payload}
        default:
            return state
    }
}

export default bioReducer