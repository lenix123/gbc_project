import {
    RESET_NOTIFICATION,
    SET_ERROR_NOTIFICATION,
    SET_SUCCESS_NOTIFICATION
} from "./actions";


const defaultState = {
    errorMessage: "",
    successMessage: "",
}

export const notificationsReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_ERROR_NOTIFICATION:
            return {
                ...state,
                errorMessage: action.payload
            }
        case SET_SUCCESS_NOTIFICATION:
            return {
                ...state,
                successMessage: action.payload
            }
        case RESET_NOTIFICATION:
            return {
                errorMessage: "",
                successMessage: ""
            }
        default:
            return state;
    }
}