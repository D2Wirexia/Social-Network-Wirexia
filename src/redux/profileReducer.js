import {dalAPi} from "../components/Api/Api";

const ADD_POST = "profileReducer/ADD-POST";
const DELETE_POST = "profileReducer/DELETE_POST-POST";
const SET_USER_PROFILE = 'profileReducer/SET_USER_PROFILE';
const SET_PROFILE_STATUS = 'profileReducer/SET_PROFILE_STATUS';
const ADD_LIKE = 'profileReducer/ADD_LIKE';
const PUSH_ID_LIKES = 'profileReducer/PUSH_ID_LIKES';
const SET_PHOTO = 'profileReducer/SET_PHOTO';


let initialState = {
	postData: [
		{id: 4, message: 'DA DA DA', like: 3115},
		{id: 3, message: 'I talk u come me', like: 146311},
		{id: 2, message: 'Hi bro, how are u?', like: 1244444},
		{id: 1, message: 'It\'s first post', like: 21600875346},
	],
	profile: null,

	status: "",
	isShowIdLike: [],
};
const profileReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_POST:
			return {
				...state,
				postData: [{
					id: state.postData[0].id + 1,
					message: action.text,
					like: 0
				}, ...state.postData],
			};
		case DELETE_POST:
			return {
				...state,
				postData: state.postData.filter(p => p.id !== action.postId)
			};
		case SET_USER_PROFILE:
			return {
				...state,
				profile: action.profile
			};
		case SET_PROFILE_STATUS:
			return {
				...state,
				status: action.status
			};
		case ADD_LIKE:
			return {
				...state,
				postData: state.postData.map(u => {
					if (u.id === action.id) {
						return {...u, like: state.postData[state.postData.length - action.id].like + 1};
					}
					return u;
				}),
			};
		case PUSH_ID_LIKES:
			return {
				...state,
				isShowIdLike: action.expectation
					 ? [...state.isShowIdLike, action.id]
					 : state.isShowIdLike.filter(id => id !== action.id)
			};
		case SET_PHOTO:
			return {
				...state,
				profile: {...state.profile, photos: action.photo}
			};
		default:
			return state;
	}
};
export const addPost = (text) => ({type: ADD_POST, text});
export const deletePost = (postId) => ({type: DELETE_POST, postId});
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});
export const setProfileStatus = (status) => ({type: SET_PROFILE_STATUS, status});
export const addLike = (id) => ({type: ADD_LIKE, id});
export const pushIdLikes = (expectation, id) => ({type: PUSH_ID_LIKES, expectation, id});
export const setPhotoSuccess = (photo) => ({type: SET_PHOTO, photo});


export const profileThunk = (userId) => async (dispatch) => {
	let response = await dalAPi.getProfile(userId);
	dispatch(setUserProfile(response.data));
};
export const statusThunk = (userId) => async (dispatch) => {
	let response = await dalAPi.getStatus(userId);
	dispatch(setProfileStatus(response.data));
};
export const statusUpdateThunk = (status) => async (dispatch) => {
	let response = await dalAPi.putUpdateStatus(status);
	if (response.data.resultCode === 0) {
		dispatch(setProfileStatus(status));
	}
};
export const savePhoto = (file) => async (dispatch) => {
	let response = await dalAPi.putDownloadPhoto(file);
	if (response.data.resultCode === 0) {
		dispatch(setPhotoSuccess(response.data.data.photos));
	}
};
export default profileReducer;