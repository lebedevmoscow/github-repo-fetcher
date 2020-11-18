export const LOAD_USER_BIO: string = 'LOAD_USER_BIO'
export const LOAD_USER_BIO_SUCCESS: string = 'LOAD_USER_BIO_SUCCESS'
export const LOAD_USER_BIO_ERROR: string = 'LOAD_USER_BIO_ERROR'

export interface ILoadUserBio {
    type: typeof LOAD_USER_BIO,
    payload: String
}

export interface ILoadUserBioSuccess {
	type: typeof LOAD_USER_BIO_SUCCESS,
	payload: Object
}

export interface ILoadUserBioError {
	type: typeof LOAD_USER_BIO_ERROR,
	payload: String
}

export type BioTypes = ILoadUserBio | ILoadUserBioSuccess | ILoadUserBioError