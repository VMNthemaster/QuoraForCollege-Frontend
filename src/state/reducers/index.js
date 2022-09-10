import {combineReducers} from 'redux'
import adminLoginDetailsReducer from './admin-login-reducer'
import studentLoginDetailsReducer from './student-login-reducer'
import userDetailsReducer from './user-reducer'


const reducers = combineReducers({
    user: userDetailsReducer,
    isStudentLoggedIn: studentLoginDetailsReducer,
    isAdminLoggedIn: adminLoginDetailsReducer
})

export default reducers