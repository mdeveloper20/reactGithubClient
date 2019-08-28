import {LOGOUT_USER, SET_USER, UPDATE_USER_MOBILE, UPDATE_USER_PASS} from "../actions/type";

const initialState = {
    id: null,
    name: null,
    email: null,

};

export default (user = (state = initialState, action = {}) => {
    switch (action.type) {
        case SET_USER:
            const {user} = action;
            return {
                id: user.user.id,
                name: user.user.name,
                email: user.user.email,
            };
        case UPDATE_USER_PASS:
            return {
                id: state.id,
                name: state.name,
                email: state.email,
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
