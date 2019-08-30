import {LOGOUT_USER, PURGE, SAVE_USER} from "./type";


export const saveUser = (name, email, password) => ({
    type: SAVE_USER,
    name,
    email,
    password
});


export const purge = () => ({
    type: PURGE
});


export const logoutUser = () => ({
    type: LOGOUT_USER
});
