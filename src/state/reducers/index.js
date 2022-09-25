import {combineReducers} from 'redux'
import adminLoginDetailsReducer from './admin-login-reducer'
import downvoteDetailsReducer from './downvote-reducer'
import studentLoginDetailsReducer from './student-login-reducer'
import upvoteDetailsReducer from './upvote-reducer'
import userDetailsReducer from './user-reducer'


const reducers = combineReducers({
    user: userDetailsReducer,
    isStudentLoggedIn: studentLoginDetailsReducer,
    isAdminLoggedIn: adminLoginDetailsReducer,
    hasUpvoted: upvoteDetailsReducer,
    hasDownvoted: downvoteDetailsReducer
})

export default reducers