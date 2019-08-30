import {LOGOUT_USER, PURGE, SAVE_EMAIL, SAVE_PASSWORD, SAVE_USER, SET_USER, UPDATE_USER_PASS} from "./type";


export const saveUser = (name,email,password) => ({
    type: SAVE_USER,
    name,
    email,
    password
});


















export const logoutUser = () => ({
    type: LOGOUT_USER
});
export const purgeStorage = () => ({
    type: PURGE
});