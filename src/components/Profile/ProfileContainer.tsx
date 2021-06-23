import React from "react";
import Profile from "./Profile";
import {connect} from 'react-redux'
import {
	profileThunk,
	statusThunk,
	statusUpdateThunk,
	savePhoto
} from "../../redux/profileReducer";
import {withRouter} from "react-router-dom";
import {withAuthRedirect} from "../Hoc/withAuthRedirect";
import {compose} from "redux";
import {AppStateType} from "../../redux/redux-store";
import {profileType} from "../../types/types";
import { RouteComponentProps } from 'react-router';

class ProfileContainer extends React.Component<PropsType> {
	refreshProfile(){
		let userId: number | null = +this.props.match.params.userId;
		if(!userId){
			userId = this.props.authorizedUserId;
			if(!userId){
				this.props.history.push("/login");
			}
		}
		if(!userId){
			throw new Error("id should be exists in URL params or in state ('auth')")
		}else{
			this.props.profileThunk(userId)
			this.props.statusThunk(userId)
		}
	}
	componentDidMount() {
		this.refreshProfile();

	}
	componentDidUpdate(prevProps: PropsType, prevState: PropsType) {
		if(prevProps.match.params.userId !== this.props.match.params.userId){
			this.refreshProfile();
		}
	}

	render() {
		return <Profile {...this.props} isOwner={!this.props.match.params.userId}/>
	}
}
type MapStateToPropsType = {
	profile: profileType | null
	status: string
	authorizedUserId: number | null
	isAuth: boolean
}
type MapDispatchToPropsType  = {
	profileThunk: (userId: number | null) => void
	statusThunk: (userId: number) => void
	statusUpdateThunk: (status: string) => void
	savePhoto: (file: File) => void
}
type PathParamsType = {
	userId: string
}
type PropsType = MapStateToPropsType & MapDispatchToPropsType & RouteComponentProps<PathParamsType>
let mapStateToProps = (state: AppStateType) => {
	return {
		profile: state.profilePage.profile,
		status: state.profilePage.status,
		authorizedUserId: state.authPart.id,
		isAuth: state.authPart.isAuth
	}
};


export default compose<React.ComponentType>(
	 connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, {profileThunk, statusThunk, statusUpdateThunk, savePhoto}),
	 withRouter,
	 withAuthRedirect
)(ProfileContainer);