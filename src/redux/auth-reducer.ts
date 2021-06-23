import {dalAPi, ResultCodeEnum} from "../components/Api/Api";
import {stopSubmit} from "redux-form";
import {BaseThunkType, InferActionsType} from "./redux-store";
import {profileType} from "../types/types";



let initialState = {
	id: null as number | null,
	email: null as string | null,
	login: null as string | null,
	isAuth: false,
	mainProfile: null as profileType | null,
	captchaIUrl: null as string | null
};
export type initialStateType = typeof initialState;
type ActionsType = InferActionsType<typeof actions>

const authReducer = (state = initialState, action: ActionsType): initialStateType => {
	switch (action.type) {
		case 'auth/SET_USER_DATA':
			return  {
				...state,
				...action.payload,
			};
		case 'auth/SET_MAIN_PROFILE':
			return {
				...state,
				mainProfile: action.profile
			};
		case 'auth/SET_CAPTCHA_URL':
			return {
				...state,
				captchaIUrl: action.url
			};
		default:
			return state;
	}
};
const actions = {
	setAuthUserData: (id: number | null, email: string | null, login: string | null, isAuth: boolean) => ({type: 'auth/SET_USER_DATA', payload: {id, email, login, isAuth}} as const),
	setCaptchaUrl: (url: string) => ({type: 'auth/SET_CAPTCHA_URL', url} as const),
	setMainProfile: (profile: profileType) => ({type: 'auth/SET_MAIN_PROFILE', profile} as const)
}

export const setMainProfileThunk = (id: number | null): BaseThunkType<ActionsType>  => async (dispatch) => {
	const data = await dalAPi.getProfile(id);
	dispatch(actions.setMainProfile(data));
};

export const authThunk = (): BaseThunkType<ActionsType> => async (dispatch) => {
	const response = await dalAPi.getAuthAxios();
	if(response.resultCode === ResultCodeEnum.Success){
		let {id, email, login} = response.data;
		dispatch(actions.setAuthUserData(id, email, login, true));
	}
};
export const loginThunk = (email: string, password: string, rememberMe: boolean, captcha: string): BaseThunkType<ActionsType | ReturnType<typeof stopSubmit>> => async (dispatch) => {
	const data = await dalAPi.postLoginAxios(email, password, rememberMe, captcha);
	if(data.resultCode === ResultCodeEnum.Success) {
		dispatch(authThunk());
	}else{
	if(data.resultCode === ResultCodeEnum.CaptchaIsRequired) {
		dispatch(getCaptchaUrlThunk())
	}
		let mes = data.messages.length > 0 ? data.messages[0] : "Some error";
		dispatch(stopSubmit('login', {_error: mes}));
	}
};
export const logoutThunk = (): BaseThunkType<ActionsType> => async (dispatch) => {
	const data = await dalAPi.deleteLoginAxios();
		if(data.resultCode === 0){
			dispatch(actions.setAuthUserData(null, null, null, false));
		}
};
export const getCaptchaUrlThunk = (): BaseThunkType<ActionsType> => async (dispatch) => {
	let data = await dalAPi.getCaptcha();
	dispatch(actions.setCaptchaUrl(data.url))
};

export default authReducer;