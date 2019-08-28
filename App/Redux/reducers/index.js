import user from "./userReducer";
import setting from "./settingReducer";
import rehydrated from "./rehydrated";
import { REHYDRATE, PURGE, persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // or whatever storage you are using
const config = {
      key: 'primary',
      storage
}

export default persistCombineReducers(config, {user,setting})
