
export const ADD_USER_DETAILS = "ADD_USER_DETAILS";
export const REMOVE_USER_DETAILS = "REMOVE_USER_DETAILS";

export const addUserDetails = (token, expiryDate, role, email) => {
    return {
        type: ADD_USER_DETAILS,
        payload: {
            token: token, expiryDate: expiryDate, role: role, email: email
        }
    };
};

export const removeUserDetails = () => {
    return {
        type: REMOVE_USER_DETAILS
    };
};