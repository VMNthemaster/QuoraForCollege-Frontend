const downvoteDetailsReducer = (state = [], action) => {
    if(action.type === 'setDownvoteDetails'){
        return action.payload
    }
    else{
        return state
    }
}

export default downvoteDetailsReducer