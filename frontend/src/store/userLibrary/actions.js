export const SET_USER_LIBRARY = "TAKE_USER_LIBRARY";
export const CHANGE_USER_COMPONENT_STYLE = "CHANGE_USER_COMPONENT_STYLE";
export const RESET_USER_COMPONENT_STYLES = "RESET_USER_COMPONENT_STYLES";

export const setUserLibrary = (userComponents) => ({
    type: SET_USER_LIBRARY,
    payload: userComponents
});

export const setUserComponentStyle = (componentName, styleTypeToChange, styleValue) => ({
    type: CHANGE_USER_COMPONENT_STYLE,
    payload: {
        componentName,
        styleTypeToChange,
        styleValue
    }
});

export const resetUserComponentStyles = (componentName) => ({
    type: RESET_USER_COMPONENT_STYLES,
    payload: componentName,
});