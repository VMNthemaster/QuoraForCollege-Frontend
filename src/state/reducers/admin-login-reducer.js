const adminLoginDetailsReducer = (state = false, action) => {    // initially user wont be logged in hence false
    if(action.type === 'setAdminLoginDetails'){
        return action.payload
    }
    else{
        return state
    }
}

export default adminLoginDetailsReducer