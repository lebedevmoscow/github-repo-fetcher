import {Reducer,combineReducers} from 'redux'

// Reducers
import test from './test'

// Interfaces
import {ITestReducer} from './test'

interface IActionObject<P = null> {
    type: String,
    payload?: P
}

interface IGlobalStore {
    test: ITestReducer
}

const rootReducer: Reducer<IGlobalStore, IActionObject> = combineReducers({
    test
})

export default rootReducer
