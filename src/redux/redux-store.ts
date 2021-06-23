import {Action, applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer from "./profileReducer";
import messageReducer from "./messageReducer";
import sidebarReducer from "./sidebarReducer";
import usersReducer from "./usersReducer";
import authReducer from "./auth-reducer";
import thunk, {ThunkAction} from "redux-thunk";
import {reducer as formReducer} from "redux-form";
import appReducer from "./app-reducer";
import settingsReducer from "./settingsReducer";
import newsReducer from "./newsReducer";

let rootReducers = combineReducers({
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
type RootReducerType = typeof rootReducers
export type AppStateType = ReturnType<RootReducerType>

type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never
export type InferActionsType<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesTypes<T>>

//export type InferActionsType<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never

export type BaseThunkType<A extends Action, P = Promise<void>> = ThunkAction<P, AppStateType, unknown, A>


let store = createStore(rootReducers, applyMiddleware(thunk));

// @ts-ignore
window.store = store;

export default store;