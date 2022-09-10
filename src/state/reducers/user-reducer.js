const userDetailsReducer = (state = {}, action) => {
    if(action.type === 'getUserDetails'){
        return state
    }
    else if(action.type === 'setUserDetails'){
        return action.payload
    }
    else{
        return state
    }
}

export default userDetailsReducer