import {usersType} from "../types/types";
type SubType = {
	followed: boolean
}
export const objectInArray = (items: Array<usersType>, itemId: number, objPropName: string, newObjProps: SubType) => {
	return items.map((u: any) => {
		if (u[objPropName] === itemId) {
			return {...u, ...newObjProps};
		}
		return u;
	})
};