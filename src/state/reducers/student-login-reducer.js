const studentLoginDetailsReducer = (state = false, action) => {    // initially user wont be logged in hence false
    if(action.type === 'setStudentLoginDetails'){
        return action.payload
    }
    else{
        return state
    }
}

export default studentLoginDetailsReducer