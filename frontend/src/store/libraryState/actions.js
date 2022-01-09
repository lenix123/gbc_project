export const COMPONENT_CHANGE_STATE = "COMPONENT_CHANGE_STATE";
export const COMPONENT_RESET_STYLES = "COMPONENT_RESET_STYLES";

export const setComponentState = (componentName, styleTypeToChange, styleValue) => ({
    type: COMPONENT_CHANGE_STATE,
    payload: {
        componentName,
        styleTypeToChange,
        styleValue
    }
});

export const resetComponentStyles = (componentName) => ({
    type: COMPONENT_RESET_STYLES,
    payload: componentName
})