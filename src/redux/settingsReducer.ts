import {dalAPi, ResultCodeEnum} from "../components/Api/Api";
import {profileThunk} from "./profileReducer";
import {stopSubmit} from "redux-form";
import {profileType} from "../types/types";
import {BaseThunkType, InferActionsType} from "./redux-store";
import {setMainProfileThunk} from "./auth-reducer";

let initialState = {
	darkMode: false,
};
type initialStateType = typeof initialState
type ActionsType = InferActionsType<typeof actions>

const settingsReducer = (state = initialState, action: ActionsType): initialStateType => {
	switch (action.type) {
		case 'settings/SET_DARK_MODE':
			return {
				...state,
				darkMode: action.darkMode
			};
		default: return state
	}
};
export const actions = {
	setDarkMode: (darkMode: boolean) => ({type: 'settings/SET_DARK_MODE', darkMode} as const)
}


export const saveProfileThunk = (profileSettings: profileType):  BaseThunkType<ActionsType | ReturnType<typeof stopSubmit>> => async (dispatch, getState) => {
	const userId = getState().authPart.id;
	let data = await dalAPi.putUpdateProfile(profileSettings);
	if (data.resultCode === ResultCodeEnum.Success) {
		dispatch(profileThunk(userId))
		dispatch(setMainProfileThunk(userId))
	}else{
		const errorPopUp = data.messages[0].split("(")[0] + data.messages[0].split("(")[1].split("->")[1].split(")")[0];
		dispatch(stopSubmit("settingsProfile",
			 /*{"contacts": {"twitter": "Not a valid link " + errorPopUp}}))*/
			 {_error: errorPopUp}));
		return Promise.reject(errorPopUp)
	}
};

export default settingsReducer;