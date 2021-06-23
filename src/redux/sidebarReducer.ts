import dimuchPhoto from './../img/dimuch.png'
import {topFriendsType} from "../types/types";
import {InferActionsType} from "./redux-store";

let initialState = {
	friends: [
		{id: 1, name: 'Vladimir Zelensky',
			photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Volodymyr_Zelensky_Official_portrait_%28cropped%29.jpg/248px-Volodymyr_Zelensky_Official_portrait_%28cropped%29.jpg',
		},
		{id: 2, name: 'Nastenka',
			photoUrl: 'https://svirtus.cdnvideo.ru/SO9sxAqnAkR1tN1Kg6jXFhWvYMM=/0x0:371x371/800x0/filters:quality(100)/https://hb.bizmrg.com/cybersportru-media/d4/d4e61b79893464edf8fac84d5b25bcd6.jpg?m=6abf7ca4aedde894c0fb76aea5a89542',
		},
		{id: 3, name: 'Dimuch BigBoss',
			photoUrl: dimuchPhoto,
		},
		{id: 4, name: 'Artem lowSkill',
			photoUrl: 'https://abakan-news.ru/wp-content/uploads/2018/03/-e1520919096875.jpg',
		},
	] as Array<topFriendsType>
};
type initialStateType = typeof initialState
type ActionsType = InferActionsType<typeof actions>
const sidebarReducer = (state = initialState, action: ActionsType): initialStateType => {
	switch (action.type) {

		default: return state
	}
};
const actions = {

}
export default sidebarReducer;