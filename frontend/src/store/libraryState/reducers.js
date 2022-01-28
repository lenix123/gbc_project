import {CHANGE_COMPONENT_STATE, RESET_COMPONENT_STYLES} from "./actions";

const defaultState = {
    "Classic": { text: '', fs: '', bg: '', cl: '', fw: '', br: '' },
    "Outline": { text: '', fs: '', bc: '', bw: '', clh: '', fw: '', br: '' },
    "Waves": { text: '', fs: '', bg: '', bc: '', cl: '', fw: '' },
    "Data": { text: '', mask: '', fs: '', bg: '', cl: '', fw: '', ow: '', oc: '', br: '' },
    "Login": { text: '', fs: '', cl: '', fw: '', bw: '', bc: '' },
    "Password": { text: '', fs: '', cl: '', fw: '', bw: '', bc: '' },
    "Email": { text: '', fs: '', cl: '', fw: '', bw: '', bc: '' },
    "Telephone": { text: '', fs: '', cl: '', fw: '', bw: '', bc: '' },
    "Entry": { text: '', bg: '', bw: '', bc: '', br: '', btn: '', type: '', sync: '' },
    "BankCard": { text: '', bg: '', cl: '', bw: '', bc: '', br: '' },
    "Card": { text: '', url: '', fs: '', bg: '', cl: '', fw: '', bw: '', bc: '', btn: '', wd: '' },
};

export const libraryStateReducer = (state = defaultState, action) => {
    switch (action.type) {
        case CHANGE_COMPONENT_STATE:

            const {componentName, styleTypeToChange, styleValue} = action.payload;
            const updatedStyles = state[componentName];
            updatedStyles[styleTypeToChange] = styleValue;

            return {
                ...state,
                [componentName]: updatedStyles
            }

        case RESET_COMPONENT_STYLES:
            const componentToReset = action.payload;
            const resetStyles = state[componentToReset];
            const properties =  Object.keys(resetStyles);

            properties.forEach(property => {
                resetStyles[property] = '';
            });

            return {
                ...state,
                [componentToReset]: resetStyles
            }

        default:
            return state;
    }
}