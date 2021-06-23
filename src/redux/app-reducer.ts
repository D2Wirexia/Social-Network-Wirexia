import {authThunk} from "./auth-reducer";
import {BaseThunkType, InferActionsType} from "./redux-store";

let initialState = {
	initialized: false as boolean
};
type initialStateType = typeof initialState
type ActionsType = InferActionsType<typeof actions>

const appReducer = (state= initialState, action: ActionsType): initialStateType => {
	switch (action.type) {
		case 'app/SET_INITIALIZED':
			return{
				...state,
				initialized: true
			};
		default:
			return state;
	}
};
const actions = {
	initializedSuccess: () => ({type: 'app/SET_INITIALIZED'} as const)
}

export const initializeApp = () => (dispatch: any) => {
	let promise = dispatch(authThunk());
	Promise.all([promise]).then( () => dispatch(actions.initializedSuccess()) );
};

export default appReducer;