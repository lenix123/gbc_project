import { SET_NEW_APP_THEME } from "./actions";

const defaultState = {
    theme: "light"
};

export const appThemeReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_NEW_APP_THEME:
            return {
                ...state,
                theme: state.theme === 'light' ? 'dark' : 'light'
            }
        default:
            return state;
    }
}