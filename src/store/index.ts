import {createStore, applyMiddleware,Store, Middleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import Thunk from 'redux-thunk'

// Main reducer
import rootReducer from './../reducers'

const middleware: Middleware[] = [Thunk]

export type AppState = ReturnType<typeof rootReducer>

const store: Store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)))
export default store