import { SHOW_NEW_COMPONENT, SET_USER_COMPONENTS } from "./actions";

const defaultState = {
    componentName: "",
    isUserComponent: false,
    userComponentName: "",
    userComponents: {},
};

export const currentComponentReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SHOW_NEW_COMPONENT:
            // если пользователь вызывает компонент, который уже отображается,
            // значит этот компанент больше не нужно отображать
            if (action.payload.componentName === state.componentName && action.payload.userComponentName === state.userComponentName) {
                return {
                    ...state,
                    componentName: "",
                    isUserComponent: action.payload.isUserComponent,
                    userComponentName: ""
                }
            } else {
                // если пользователь вызывает новый компонент из библиотеки,
                // то его нужно отобразить
                return {
                    ...state,
                    componentName: action.payload.componentName,
                    isUserComponent: action.payload.isUserComponent,
                    userComponentName: action.payload.userComponentName
                }
            }
        case SET_USER_COMPONENTS:
            return {
                ...state,
                userComponents: action.payload
            }
        default:
            return state;
    }
}