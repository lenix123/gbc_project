import {SET_SUCCESSFUL_STATUS, RETURN_TO_DEFAULT_STATUS} from "./actions";

const defaultState = {
    isCreatedNewComponent: false
}

export const createdUserComponentReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_SUCCESSFUL_STATUS:
            return {
                ...state,
                isCreatedNewComponent: true
            }
        case RETURN_TO_DEFAULT_STATUS:
            return {
                ...state,
                isCreatedNewComponent: false
            }
        default:
            return state;
    }
}