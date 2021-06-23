import React from 'react';
import Header from "./Header";
import {connect} from 'react-redux'
import {logoutThunk} from "../../redux/auth-reducer";
import {AppStateType} from "../../redux/redux-store";

type MapStateToPropsType = {
	darkMode: boolean
	isAuth: boolean
	login: string | null
}
type MapDispatchToPropsType = {
	logoutThunk: () => void
}
type OwnPropsType = {}
type PropsType = MapStateToPropsType & MapDispatchToPropsType

class HeaderContainer extends React.Component<PropsType> {
	render() {
		return <Header {...this.props} />
	}
}
const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
	return {
		isAuth: state.authPart.isAuth,
		login: state.authPart.login,
		darkMode: state.settingPage.darkMode
	}
};

export default connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(mapStateToProps, {logoutThunk})(HeaderContainer);