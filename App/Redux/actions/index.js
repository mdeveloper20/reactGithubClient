import {LOGOUT_USER, PURGE, SAVE_EMAIL, SAVE_PASSWORD, SET_USER, UPDATE_USER_PASS} from "./type";


export const saveEmail = email => ({
    type: SAVE_EMAIL,
    email
});


export const savePassword = password => ({
    type: SAVE_PASSWORD,
    password
});




















export const setUser = user => ({
    type: SET_USER,
    user: user
});
export const updateUserPassword = () => ({
    type: UPDATE_USER_PASS
});
export const logoutUser = () => ({
    type: LOGOUT_USER
});
export const purgeStorage = () => ({
    type: PURGE
});