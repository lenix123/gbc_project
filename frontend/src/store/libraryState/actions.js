export const CHANGE_COMPONENT_STATE = "CHANGE_COMPONENT_STATE";
export const RESET_COMPONENT_STYLES = "RESET_COMPONENT_STYLES";

export const setComponentState = (componentName, styleTypeToChange, styleValue) => ({
    type: CHANGE_COMPONENT_STATE,
    payload: {
        componentName,
        styleTypeToChange,
        styleValue
    }
});

export const resetComponentStyles = (componentName) => ({
    type: RESET_COMPONENT_STYLES,
    payload: componentName
})