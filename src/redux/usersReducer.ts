import {dalAPi} from "../components/Api/Api";
import {objectInArray} from "../utils/object-helpers";
import {usersType} from "../types/types";
import {Dispatch} from "redux";
import {BaseThunkType, InferActionsType} from "./redux-store";


let initialState = {
    users: [] as Array<usersType>,
    totalUsersCount: 0,
    pageSize: 5,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>,
};
type initialStateType = typeof initialState
type ActionsType = InferActionsType<typeof actions>

const usersReducer = (state = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case 'userReducer/FOLLOW':
            return {
                ...state,
                users: objectInArray(state.users, action.userID, "id", {followed: true})
                /*users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return {...u, followed: true};
                    }
                    return u;
                }),*/
            }
        case 'userReducer/UNFOLLOW':
            return {
                ...state,
                users: objectInArray(state.users, action.userID, "id", {followed: false})
            };
        case 'userReducer/SET_USERS':
            return {
                ...state,
                users: action.users,
            }
        case 'userReducer/SET_CURRENT_PAGE':
            return {
                ...state,
                currentPage: action.currentPage,
            };
        case 'userReducer/SET_TOTAL_USERS_COUNT':
            return {
                ...state,
                totalUsersCount: action.totalCount,
            }
        case 'userReducer/TOGGLE_IS_FETCHING':
            return {
                ...state,
                isFetching: action.isFetching,
            }
        case 'userReducer/TOGGLE_IS_FOLLOWING_PROGRESS':
            return {
                ...state,
                followingInProgress: action.progress
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        default:
            return state;
    }
};
const actions = {
    followSuccess: (userID: number) => ({type: 'userReducer/FOLLOW', userID} as const),
    unfollowSuccess: (userID: number) => ({type: 'userReducer/UNFOLLOW', userID} as const),
    setUsersAC: (users: Array<usersType>) => ({ type: 'userReducer/SET_USERS', users} as const),
    setCurrentPage: (currentPage: number) => ({type: 'userReducer/SET_CURRENT_PAGE', currentPage} as const),
    setTotalUsersCountAC: (totalUsersCount: number) => ({type: 'userReducer/SET_TOTAL_USERS_COUNT', totalCount: totalUsersCount} as const),
    toggleIsFetchingAC: (isFetching: boolean) => ({type: 'userReducer/TOGGLE_IS_FETCHING', isFetching} as const),
    toggleIsFollowingProgress: (progress: boolean, userId: number) => ({type: 'userReducer/TOGGLE_IS_FOLLOWING_PROGRESS', progress, userId} as const)
}

export const requestUsers = (currentPage: number, pageSize: number): BaseThunkType<ActionsType> => async (dispatch) => {
    dispatch(actions.toggleIsFetchingAC(true));
    dispatch(actions.setCurrentPage(currentPage));
    let data = await dalAPi.getUsersAxios(currentPage, pageSize);
    dispatch(actions.setUsersAC(data.items));
    dispatch(actions.toggleIsFetchingAC(false));
    dispatch(actions.setTotalUsersCountAC(data.totalCount));
};
const followUnfollowFlow = async (dispatch: Dispatch<ActionsType>, userId: number, apiMethod: any, actionCreator: (userId: number)=> any) => {
    dispatch(actions.toggleIsFollowingProgress(true, userId));
    let response = await apiMethod(userId);
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(actions.toggleIsFollowingProgress(false, userId));
};
export const follow = (userId: number): BaseThunkType<ActionsType> => async (dispatch) => {
    followUnfollowFlow(dispatch, userId, dalAPi.follow.bind(dalAPi), actions.followSuccess);
};
export const unfollow = (userId: number): BaseThunkType<ActionsType> => async (dispatch) => {
    followUnfollowFlow(dispatch, userId, dalAPi.unfollow.bind(dalAPi), actions.unfollowSuccess);
};
export default usersReducer;