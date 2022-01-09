import { SHOW_NEW_COMPONENT } from "./actions";

const defaultState = {
    componentName: ""
};

export const currentComponentReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SHOW_NEW_COMPONENT:
            // если пользователь вызывает компонент, который уже отображается,
            // значит этот компанент больше не нужно отображать
            if (action.payload === state.componentName) {
                return {
                    ...state,
                    componentName: ""
                }
            } else {
                // если пользователь вызывает новый компонент из библиотеки,
                // то его нужно отобразить
                return {
                    ...state,
                    componentName: action.payload
                }
            }
        default:
            return state;
    }
}