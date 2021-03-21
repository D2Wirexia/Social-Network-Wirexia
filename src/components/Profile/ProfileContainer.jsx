import React from "react";
import Profile from "./Profile";
import {connect} from 'react-redux'
import {profileThunk, statusThunk, statusUpdateThunk, addLike} from "../../redux/profileReducer";
import {withRouter} from "react-router-dom";
import {withAuthRedirect} from "../Hoc/withAuthRedirect";
import {compose} from "redux";

class ProfileContainer extends React.Component {
	componentDidMount() {
		let userId = this.props.match.params.userId;
		if(!userId){
			userId = this.props.authorizedUserId;
			if(!userId){
				this.props.history.push("/login");
			}
		}
		this.props.profileThunk(userId);
		this.props.statusThunk(userId);
	}
	render() {
		return <Profile {...this.props}/>
	}
}

let mapStateToProps = (state) => {
	return {
		profile: state.profilePage.profile,
		mainProfile: state.profilePage.mainProfile,
		status: state.profilePage.status,
		authorizedUserId: state.authPart.id,
		isAuth: state.authPart.isAuth
	}
};


export default compose(
	 connect(mapStateToProps, {profileThunk, statusThunk, statusUpdateThunk, addLike}),
	 withRouter,
	 withAuthRedirect
)(ProfileContainer);