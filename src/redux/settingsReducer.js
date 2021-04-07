import {dalAPi} from "../components/Api/Api";
import {profileThunk} from "./profileReducer";
import {stopSubmit} from "redux-form";

const SET_DARK_MODE = 'SET_DARK_MODE';

let initialState = {
	darkMode: false,
};

const settingsReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_DARK_MODE:
			return {
				...state,
				darkMode: action.darkMode
			};

		default: return state
	}
};

export const setDarkMode = (darkMode) => ({type: SET_DARK_MODE, darkMode});

export const saveProfileThunk = (profileSettings) => async (dispatch, getState) => {
	const userId = getState().authPart.id;
	let response = await dalAPi.putUpdateProfile(profileSettings);
	if (response.data.resultCode === 0) {
		dispatch(profileThunk(userId))
	}else{
		const errorPopUp = response.data.messages[0].split("(")[0] + response.data.messages[0].split("(")[1].split("->")[1].split(")")[0];
		dispatch(stopSubmit("settingsProfile",
			 /*{"contacts": {"twitter": "Not a valid link " + errorPopUp}}
			 ))*/
			 {_error: errorPopUp}));
		return Promise.reject(errorPopUp)
	}
};

export default settingsReducer;