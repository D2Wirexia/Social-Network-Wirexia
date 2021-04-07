import {applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer from "./profileReducer";
import messageReducer from "./messageReducer";
import sidebarReducer from "./sidebarReducer";
import usersReducer from "./usersReducer";
import authReducer from "./auth-reducer";
import thunk from "redux-thunk";
import {reducer as formReducer} from "redux-form";
import appReducer from "./app-reducer";
import settingsReducer from "./settingsReducer";
import newsReducer from "./newsReducer";

let reducers = combineReducers({
	profilePage: profileReducer,
	messangerPage: messageReducer,
	sideBar: sidebarReducer,
	usersPage: usersReducer,
	authPart: authReducer,
	appPage: appReducer,
	settingPage: settingsReducer,
	newsPage: newsReducer,
	form: formReducer,
});
let store = createStore(reducers, applyMiddleware(thunk));

window.store = store;

export default store;