import React from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import Nav from "./Nav";
import {AppStateType} from "../../redux/redux-store";
import {topFriendsType} from "../../types/types";


type MapStateToPropsType = {
	darkMode: boolean
	friends: Array<topFriendsType>
}
type MapDispatchToPropsType = {

}
type OwnPropsType = {}
type PropsType = MapStateToPropsType & MapDispatchToPropsType

class NavContainer extends React.Component<PropsType>{
	render() {
		return <Nav {...this.props}/>
	}
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
	return {
		darkMode: state.settingPage.darkMode,
		friends: state.sideBar.friends
	}
};

export default compose(
	 connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(mapStateToProps, {}),
)(NavContainer);
