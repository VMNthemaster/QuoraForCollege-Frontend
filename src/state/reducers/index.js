import {combineReducers} from 'redux'
import userDetailsReducer from './user-reducer'

const reducers = combineReducers({
    user: userDetailsReducer
})

export default reducers