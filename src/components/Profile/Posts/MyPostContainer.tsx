
import MyPost from "./MyPost";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";
import {postType} from "../../../types/types";

type MapStateToPropsType = {
	postData: Array<postType>
	isShowIdLike: Array<number>
}
type MapDispatchToPropsType = {

}
let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
	return {
		postData: state.profilePage.postData,
		isShowIdLike: state.profilePage.isShowIdLike
	}
};


const MyPostContainer = connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, {})(MyPost);
export default MyPostContainer;