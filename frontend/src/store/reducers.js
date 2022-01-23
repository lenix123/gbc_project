import { combineReducers } from "redux";
import {libraryStateReducer} from "./libraryState/reducers";
import {currentComponentReducer} from "./currentComponent/reducers";
import {appThemeReducer} from "./appTheme/reducers";

export default combineReducers({
    libraryState: libraryStateReducer,
    currentComponent: currentComponentReducer,
    appTheme: appThemeReducer,
})