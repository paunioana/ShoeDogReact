import {GET_TOKEN, GET_USER_REVIEWS} from "./actions/action";

const initialState = {
    userReviews: [],
    token: undefined
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_REVIEWS:
            return {
                userReviews: action.payload.userReviews,
                token: state.token
            };
        case GET_TOKEN:
            return {
                userReviews: state.userReviews,
                token: action.payload.token
            };

        default:
            return state;
    }
};

export default rootReducer;