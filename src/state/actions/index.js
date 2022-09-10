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

export const setStudentLoginDetails = (bool) => {
    return (dispatch) => {
        dispatch({
            type: 'setStudentLoginDetails',
            payload: bool
        })
    }
}

export const setAdminLoginDetails = (bool) => {
    return (dispatch) => {
        dispatch({
            type: 'setAdminLoginDetails',
            payload: bool
        })
    }
}