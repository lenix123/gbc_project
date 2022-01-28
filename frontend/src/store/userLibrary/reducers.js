import {CHANGE_USER_COMPONENT_STYLE, RESET_USER_COMPONENT_STYLES, SET_USER_LIBRARY} from "./actions";

const defaultState = {};
const defaultUserLibrary = {};

export const userLibraryReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_USER_LIBRARY:
            for (let component of action.payload) {
                const params = component.params;
                defaultState[component.component_name] = params;
                // we have to use a copy of params, because original params could change.
                // in defaultUserLibrary we store default params of user Library
                defaultUserLibrary[component.component_name] = Object.assign({}, params);
            }

            return defaultState;

        case CHANGE_USER_COMPONENT_STYLE:
            const {componentName, styleTypeToChange, styleValue} = action.payload;
            const updatedStyles = state[componentName];
            updatedStyles[styleTypeToChange] = styleValue;

            return {
                ...state,
                [componentName]: updatedStyles
            }


        case RESET_USER_COMPONENT_STYLES:
            const componentToReset = action.payload;
            const resetStyles = Object.assign({}, defaultUserLibrary[componentToReset]);

            return {
                ...state,
                [componentToReset]: resetStyles
            }

        default:
            return state;
    }
}