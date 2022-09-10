export const setUserDetails = (details) => {
    return (dispatch) => {
        dispatch({
            type: 'setUserDetails',
            payload: details
        })
    }
}

export const getUserDetails = () => {
    return (dispatch) => {
        dispatch({
            type: 'getUserDetails'
        })
    }
}