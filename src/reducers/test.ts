import {Action} from 'redux'

export interface ITestReducer {
    test: string
}

const initialState: ITestReducer = {
    test: 'Initial'
}

const testReducer = (state = initialState, action: Action) => {
    switch(action.type) {
        default:
            return state
    }
}

export default testReducer