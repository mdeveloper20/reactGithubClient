import {LOGOUT_USER, SAVE_USER} from "../actions/type";

const initialState = {
    id: null,
    name: null,
    email: null,
    password:""

};

export default (user = (state = initialState, action = {}) => {
    switch (action.type) {
        case SAVE_USER:
            const {name,email,password} = action;
            return {
                ...state,
                name,
                email,
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
