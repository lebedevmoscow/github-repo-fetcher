import {Reducer,combineReducers} from 'redux'
import {IActionObject} from './../interfaces/IReducers'

// Reducers
import list, {IListReducer} from './list'
import bio, { IBioReducer } from './bio'

export interface IGlobalStore {
    list: IListReducer, 
    bio: IBioReducer
}

const rootReducer: Reducer<IGlobalStore, IActionObject> = combineReducers({
    list, bio
})

export default rootReducer
