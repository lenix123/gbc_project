export const SHOW_NEW_COMPONENT = "SHOW_NEW_COMPONENT";
export const SET_USER_COMPONENTS = "SET_USER_COMPONENTS";


export const setComponentName = (componentName, isUserComponent, userComponentName) => ({
    type: SHOW_NEW_COMPONENT,
    payload: {componentName: componentName,
        isUserComponent: isUserComponent,
        userComponentName: userComponentName}
});

export const setUserComponents = (userComponents) => ({
    type: SET_USER_COMPONENTS,
    payload: userComponents,
});