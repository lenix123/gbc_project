export const SHOW_NEW_COMPONENT = "SHOW_NEW_COMPONENT";

export const setComponentName = (componentName) => ({
    type: SHOW_NEW_COMPONENT,
    payload: componentName
});