import {CHANGE_COMPONENT_NAME, RESET_ERROR_NAME, RISE_ERROR_NAME} from "./actions";

const defaultState = {
    namesForComponents: {},
    errorText: ""
};

export const userComponentNameReducer = (state = defaultState, action) => {
    switch (action.type) {
        case CHANGE_COMPONENT_NAME:
            const {component, name} = action.payload;
            const updatedNames = state.namesForComponents;
            updatedNames[component] = name;

            return {
                ...state,
                names: updatedNames
            }
        case RISE_ERROR_NAME:
            return {
                ...state,
                errorText: action.payload
            }
        case RESET_ERROR_NAME:
            return {
                ...state,
                errorText: ""
            }
        default:
            return state;
    }
}