import {PURGE} from "../actions/type";
import {purgeStoredState} from 'redux-persist'


export default  (rehydrated =(state = false, action) => {
    switch (action.type) {
        case "persist/REHYDRATE":
            return true;
        case PURGE:
            purgeStoredState();
            return false;
        default:
            return state;
    }
});
