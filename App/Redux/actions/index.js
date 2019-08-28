import {LOGOUT_USER, PURGE, SET_USER, UPDATE_USER_PASS} from "./type";

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