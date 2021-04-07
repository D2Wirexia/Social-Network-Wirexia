import {addPost, addLike, pushIdLikes} from "../../../redux/profileReducer";
import MyPost from "./MyPost";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
	return {
		postData: state.profilePage.postData,
		isShowIdLike: state.profilePage.isShowIdLike
	}
};


const MyPostContainer = connect(mapStateToProps, {addPost, addLike, pushIdLikes})(MyPost);
export default MyPostContainer;