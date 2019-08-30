import {LOGOUT_USER, SAVE_EMAIL, SAVE_PASSWORD, SET_USER, UPDATE_USER_MOBILE, UPDATE_USER_PASS} from "../actions/type";

const initialState = {
    id: null,
    name: null,
    email: null,
    password:""

};

export default (user = (state = initialState, action = {}) => {
    switch (action.type) {
        case SAVE_EMAIL:
            const {email} = action;
            return {
                ...state,
                email
            };
        case SAVE_PASSWORD:
            const {password} = action;
            return {
                ...state,
                password
            };
        case LOGOUT_USER:
            return {
                id: null,
                name: null,
                email: null,
            };
        default:
            return state;
    }
});
