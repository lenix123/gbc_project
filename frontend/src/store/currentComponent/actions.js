export const SHOW_NEW_COMPONENT = "SHOW_NEW_COMPONENT";

export const setComponentName = (componentName, isUserComponent, userComponentName) => ({
    type: SHOW_NEW_COMPONENT,
    payload: {componentName: componentName,
        isUserComponent: isUserComponent,
        userComponentName: userComponentName}
});