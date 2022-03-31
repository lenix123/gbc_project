export const SET_ERROR_NOTIFICATION = "SET_ERROR_NOTIFICATION";
export const RESET_NOTIFICATION = "RESET_NOTIFICATION";
export const SET_SUCCESS_NOTIFICATION = "SET_SUCCESS_NOTIFICATION";

export const setErrorNotification = (errorMessage) => ({
    type: SET_ERROR_NOTIFICATION,
    payload: errorMessage
});

export const resetNotification = () => ({
   type: RESET_NOTIFICATION
});

export const setSuccessNotification = (successMessage) => ({
    type: SET_SUCCESS_NOTIFICATION,
    payload: successMessage
});