import {updateObject} from "../utility";
import {AUTH_FAIL, AUTH_LOGOUT, AUTH_START, AUTH_SUCCESS, AUTH_RESET_ERROR, SET_OLD_TOKEN} from "./actions";

const initialState = {
    token: null,
    error: null,
    loading: false
}

const authStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.token,
        error: null,
        loading: false
    });
}

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
}

const authLogout = (state, action) => {
    return updateObject(state, {
        token: null
    });
}

const resetError = (state, action) => {
    return updateObject(state, {
       error: null
    });
}

const setOldToken = (state, action) => {
    return updateObject(state, {
       token: action.token
    });
}

export const authReducer = (state=initialState, action) => {
    switch (action.type) {
        case AUTH_START: return authStart(state, action);
        case AUTH_SUCCESS: return authSuccess(state, action);
        case AUTH_FAIL: return authFail(state, action);
        case AUTH_LOGOUT: return authLogout(state, action);
        case AUTH_RESET_ERROR: return resetError(state, action);
        case SET_OLD_TOKEN: return setOldToken(state, action);
        default:
            return state;
    }
}