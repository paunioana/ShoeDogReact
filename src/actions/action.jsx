export const GET_USER_REVIEWS = "GET_USER_REVIEWS";
export const GET_TOKEN = "GET_TOKEN";

export const getUserReviews = (token) => {
    return {
        type: GET_USER_REVIEWS,
        payload: {
            token: token
        }
    };
};

export const getToken = (email, password) => {
    return {
        type: GET_TOKEN,
        payload: {
            email: email, password: password
        }
    };
};