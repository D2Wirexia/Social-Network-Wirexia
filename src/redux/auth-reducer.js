import {dalAPi} from "../components/Api/Api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = "auth/SET_USER_DATA";
const SET_MAIN_PROFILE = 'auth/SET_MAIN_PROFILE';
const SET_CAPTCHA_URL = 'auth/SET_CAPTCHA_URL';

let initialState = {
	id: null,
	email: null,
	login: null,
	isAuth: false,
	mainProfile: null,
	captchaIUrl: null
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_USER_DATA:
			return  {
				...state,
				...action.payload,
			};
		case SET_MAIN_PROFILE:
			return {
				...state,
				mainProfile: action.profile
			};
		case SET_CAPTCHA_URL:
			return {
				...state,
				captchaIUrl: action.url
			};
		default:
			return state;
	}
};
export const setAuthUserData = (id, email, login, isAuth) => {
	return {
		type: SET_USER_DATA,
		payload: {
			id,
			email,
			login,
			isAuth
		}
	}
};
export const setMainProfile = (profile) => ({type: SET_MAIN_PROFILE, profile});
export const setCaptchaUrl = url => ({type: SET_CAPTCHA_URL, url});

export const setMainProfileThunk = (id) => async (dispatch) => {
	let response = await dalAPi.getProfile(id);
	dispatch(setMainProfile(response.data));
};
export const authThunk = () => async (dispatch) => {
	let response = await dalAPi.getAuthAxios();
	if(response.resultCode === 0){
		let {id, email, login} = response.data;
		dispatch(setAuthUserData(id, email, login, true));
	}
};
export const loginThunk = (email, password, rememberMe, captcha) => async (dispatch) => {
	let response = await dalAPi.postLoginAxios(email, password, rememberMe, captcha);
	if(response.data.resultCode === 0) {
		dispatch(authThunk());
	}else{
	if(response.data.resultCode === 10) {
		dispatch(getCaptchaUrlThunk())
	}
		let mes = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
		dispatch(stopSubmit('login', {_error: mes}));
	}
};
export const logoutThunk = () => async (dispatch) => {
	let response = await dalAPi.deleteLoginAxios();
		if(response.data.resultCode === 0){
			dispatch(setAuthUserData(null, null, null, false));
		}
};
export const getCaptchaUrlThunk = () => async (dispatch) => {
	let response = await dalAPi.getCaptcha();
	dispatch(setCaptchaUrl(response.data.url))

};

export default authReducer;