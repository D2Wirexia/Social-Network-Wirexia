import {dalAPi, ResultCodeEnum} from "../components/Api/Api";
import {photosByProfileType, postType, profileType} from "../types/types";
import {BaseThunkType, InferActionsType} from "./redux-store";


let initialState = {
    postData: [
        {id: 4, message: 'DA DA DA', like: 3115},
        {id: 3, message: 'I talk u come me', like: 146311},
        {id: 2, message: 'Hi bro, how are u?', like: 1244444},
        {id: 1, message: 'It\'s first post', like: 21600875346},
    ] as Array<postType>,
    profile: null as profileType | null,
    status: "",
    isShowIdLike: [] as Array<number>,
};
export type initialStateType = typeof initialState
type ActionsType = InferActionsType<typeof actions>

const profileReducer = (state = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case 'profileReducer/ADD-POST':
            return {
                ...state,
                postData: [{
                    id: state.postData[0].id + 1,
                    message: action.text,
                    like: 0
                }, ...state.postData],
            };
        case 'profileReducer/DELETE_POST-POST':
            return {
                ...state,
                postData: state.postData.filter(p => p.id !== action.postId)
            };
        case 'profileReducer/SET_USER_PROFILE':
            return {
                ...state,
                profile: action.profile
            };
        case 'profileReducer/SET_PROFILE_STATUS':
            return {
                ...state,
                status: action.status
            };
        case 'profileReducer/ADD_LIKE':
            return {
                ...state,
                postData: state.postData.map(u => {
                    if (u.id === action.id) {
                        return {
                            ...u,
                            like: state.postData[state.postData.length - action.id].like + 1
                        };
                    }
                    return u;
                }),
            };
        case 'profileReducer/PUSH_ID_LIKES':
            return {
                ...state,
                isShowIdLike: action.expectation
                    ? [...state.isShowIdLike, action.id]
                    : state.isShowIdLike.filter(id => id !== action.id)
            };
        case 'profileReducer/SET_PHOTO':
            return {
                ...state,
                profile: {...state.profile, photos: action.photo} as profileType
            };
        default:
            return state;
    }
};
export const actions = {
    addPost: (text: string) => ({type: 'profileReducer/ADD-POST', text} as const),
    deletePost: (postId: number) => ({type: 'profileReducer/DELETE_POST-POST', postId} as const),
    setUserProfile: (profile: profileType) => ({type: 'profileReducer/SET_USER_PROFILE', profile} as const),
    setProfileStatus: (status: string) => ({type: 'profileReducer/SET_PROFILE_STATUS', status} as const),
    addLike: (id: number) => ({type: 'profileReducer/ADD_LIKE', id} as const),
    pushIdLikes: (expectation: boolean, id: number) => ({type: 'profileReducer/PUSH_ID_LIKES', expectation, id} as const),
    setPhotoSuccess: (photo: photosByProfileType) => ({type: 'profileReducer/SET_PHOTO', photo}  as const)
}

export const profileThunk = (userId: number | null): BaseThunkType<ActionsType> => async (dispatch) => {
    let data = await dalAPi.getProfile(userId);
    dispatch(actions.setUserProfile(data));
};
export const statusThunk = (userId: number): BaseThunkType<ActionsType> => async (dispatch) => {
    let data = await dalAPi.getStatus(userId);
    dispatch(actions.setProfileStatus(data));
};
export const statusUpdateThunk = (status: string): BaseThunkType<ActionsType> => async (dispatch) => {
    let data = await dalAPi.putUpdateStatus(status);
    if (data.resultCode === ResultCodeEnum.Success) {
        dispatch(actions.setProfileStatus(status));
    }
};
export const savePhoto = (file: File): BaseThunkType<ActionsType> => async (dispatch) => {
    let data = await dalAPi.putDownloadPhoto(file);
    if (data.resultCode === ResultCodeEnum.Success) {
        dispatch(actions.setPhotoSuccess(data.data.photos));
    }
};
export default profileReducer;