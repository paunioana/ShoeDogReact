import {ADD_USER_DETAILS, REMOVE_USER_DETAILS} from "./actions/action";

const initialState = {
    token: {},
    user: {}
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_USER_DETAILS:
            return {
                token: {
                    value: action.payload.token,
                    expiryDate: action.payload.expiryDate
                },
                user: {
                    email: action.payload.email,
                    role: action.payload.role
                }
            };
        case REMOVE_USER_DETAILS:
            return {
                token: {
                    value: "",
                    expiryDate: ""
                },
                user: {
                    email: "",
                    role: ""
                }
            };

        default:
            return state;
    }
};

export default rootReducer;