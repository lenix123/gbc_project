export const CHANGE_COMPONENT_NAME = "CHANGE_COMPONENT_NAME";
export const RISE_ERROR_NAME = "RISE_ERROR_NAME";
export const RESET_ERROR_NAME = "RESET_ERROR_NAME";

export const changeUserComponentName = (component, name) => ({
    type: CHANGE_COMPONENT_NAME,
    payload: {
        component,
        name
    }
})

export const riseErrorName = (errorText) => ({
    type: RISE_ERROR_NAME,
    payload: errorText
})

export const resetErrorName = () => ({
    type: RESET_ERROR_NAME
})