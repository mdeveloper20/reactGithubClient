import {CHANGE_SETTING} from "../actions/type";

const initialState = {
    test: 0
};

export default (setting = (state = initialState, action = {}) => {
    switch (action.type) {
        case CHANGE_SETTING:
            const {test} = action;
            return {
                ...state,
                test: test
            };

        default:
            return state;
    }
});
