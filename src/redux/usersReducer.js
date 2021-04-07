import {dalAPi} from "../components/Api/Api";
import {objectInArray} from "../utils/object-helpers";

const FOLLOW = "userReducer/FOLLOW";
const UNFOLLOW = "userReducer/UNFOLLOW";
const SET_USERS = "userReducer/SET_USERS";
const SET_CURRENT_PAGE = "userReducer/SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "userReducer/SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = "userReducer/TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOWING_PROGRESS = "userReducer/TOGGLE_IS_FOLLOWING_PROGRESS";
let initialState = {
	users: [],
	usersBest: [
		{
			id: 1,
			followed: true,
			name: 'Vladimir Zelensky',
			photos: {
				small: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Volodymyr_Zelensky_Official_portrait_%28cropped%29.jpg/248px-Volodymyr_Zelensky_Official_portrait_%28cropped%29.jpg'
			},
			status: '#ThePrezedent',
			location: {city: 'Kiev', country: 'Ukraine'}
		},
		{
			id: 2,
			followed: true,
			name: 'Nastenka',
			photos: {
				small: 'https://svirtus.cdnvideo.ru/SO9sxAqnAkR1tN1Kg6jXFhWvYMM=/0x0:371x371/800x0/filters:quality(100)/https://hb.bizmrg.com/cybersportru-media/d4/d4e61b79893464edf8fac84d5b25bcd6.jpg?m=6abf7ca4aedde894c0fb76aea5a89542'
			},
			status: 'I\'m Little girl',
			location: {city: 'Kiev', country: 'Ukraine'}
		},
		{
			id: 3,
			followed: true,
			name: 'Dima BigBoss',
			photos: {
				small: 'https://yt3.ggpht.com/a/AATXAJxegcKj7lnz8MCMgcAz-gpSgPs5u5yMvynOEWiL=s176-c-k-c0x00ffffff-no-rj-mo',
			},
			status: 'next lvl improve skills',
			location: {city: 'Minsk', country: 'Belarus'}
		},
		{
			id: 4,
			followed: true,
			name: 'Artem lowSkill',
			photos: {
				small: 'https://abakan-news.ru/wp-content/uploads/2018/03/-e1520919096875.jpg'
			},
			status: 'All about this...',
			location: {city: 'Sumy', country: 'Ukraine'}
		},
	],
	totalUsersCount: 0,
	pageSize: 5,
	currentPage: 1,
	isFetching: false,
	followingInProgress: [],
};
const usersReducer = (state = initialState, action) => {
	switch (action.type) {
		case FOLLOW:
			return {
				...state,
				users: objectInArray(state.users, action.userId, "id", {followed: true})
				/*users: state.users.map(u => {
					if (u.id === action.userID) {
						return {...u, followed: true};
					}
					return u;
				}),*/
			};
		case UNFOLLOW:
			return {
				...state,
				users: objectInArray(state.users, action.userId, "id", {followed: false})
			};
		case SET_USERS:
			return {
				...state,
				users: action.users,
			};
		case SET_CURRENT_PAGE:
			return {
				...state,
				currentPage: action.currentPage,
			};
		case SET_TOTAL_USERS_COUNT:
			return {
				...state,
				totalUsersCount: action.totalCount,
			};
		case TOGGLE_IS_FETCHING:
			return {
				...state,
				isFetching: action.isFetching,
			};
		case TOGGLE_IS_FOLLOWING_PROGRESS:
			return {
				...state,
				followingInProgress: action.progress
					 ? [...state.followingInProgress, action.userId]
					 : state.followingInProgress.filter(id => id !== action.userId)
			};
		default:
			return state;
	}
};
export const followSuccess = (userID) => ({type: FOLLOW, userID});
export const unfollowSuccess = (userID) => ({type: UNFOLLOW, userID});
export const setUsersAC = (users) => ({type: SET_USERS, users});
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage});
export const setTotalUsersCountAC = (totalUsersCount) => ({
	type: SET_TOTAL_USERS_COUNT, totalCount: totalUsersCount
});
export const toggleIsFetchingAC = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});
export const toggleIsFollowingProgress = (progress, userId) => ({
	type: TOGGLE_IS_FOLLOWING_PROGRESS, progress, userId
});
export const requestUsers = (currentPage, pageSize) => async (dispatch) => {
	dispatch(toggleIsFetchingAC(true));
	dispatch(setCurrentPage(currentPage));
	let data = await dalAPi.getUsersAxios(currentPage, pageSize);
	dispatch(setUsersAC(data.items));
	dispatch(toggleIsFetchingAC(false));
	dispatch(setTotalUsersCountAC(data.totalCount));
};
const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
	debugger
	dispatch(toggleIsFollowingProgress(true, userId));
	let response = await apiMethod(userId);
	if (response.data.resultCode === 0) {
		dispatch(actionCreator(userId));
	}
	dispatch(toggleIsFollowingProgress(false, userId));
};
export const follow = (userId) => async (dispatch) => {
		followUnfollowFlow(dispatch, userId, dalAPi.follow.bind(dalAPi), followSuccess);
};
export const unfollow = (userId) => async (dispatch) => {
		followUnfollowFlow(dispatch, userId, dalAPi.unfollow.bind(dalAPi), unfollowSuccess);
};
export default usersReducer;