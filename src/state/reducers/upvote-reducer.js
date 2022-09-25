const upvoteDetailsReducer = (state = [], action) => {
    if(action.type === 'setUpvoteDetails'){
        return action.payload
    }
    else{
        return state
    }
}

export default upvoteDetailsReducer
