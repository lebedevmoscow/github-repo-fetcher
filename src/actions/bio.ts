import { Dispatch } from 'redux'
import axios from 'axios'
import {
    LOAD_USER_BIO,
    LOAD_USER_BIO_ERROR,
    LOAD_USER_BIO_SUCCESS,
    ILoadUserBio,
    ILoadUserBioError,
    ILoadUserBioSuccess
} from './../types/bio.actions'

import {GITHUB_API_BASE_URL} from './../config'


export const startLoadBio = (username: String): ILoadUserBio => {
    return {
        type: LOAD_USER_BIO,
        payload: username
    }
}

export const errorInLoadBio = (message: String): ILoadUserBioError => {
    return {
        type: LOAD_USER_BIO_ERROR,
        payload: message
    }   
}

export const successLoadBio = (data: Object): ILoadUserBioSuccess => {
    return {
        type: LOAD_USER_BIO_SUCCESS,
        payload: data
    }
}

export const loadUserBio = (slug: String) => {
    return async (dispatch: Dispatch) => {
        dispatch(startLoadBio(slug))

        try {
            const req = await axios.get(`${GITHUB_API_BASE_URL}/users/${slug}`)
            if (req) {
                dispatch(successLoadBio(req.data))
            }
        } catch (e) {
            dispatch(errorInLoadBio('This user does not exist'))
            console.log('Cannot load user bio in current time, e', e.message || e)
        }
    }
} 