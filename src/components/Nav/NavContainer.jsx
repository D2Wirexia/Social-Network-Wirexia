import React from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import Nav from "./Nav";

class NavContainer extends React.Component{
	render() {
		return <Nav {...this.props}/>
	}
}

let mapStateToProps = (state) => {
	return {
		darkMode: state.settingPage.darkMode,
		friends: state.sideBar.friends
	}
};

export default compose(
	 connect(mapStateToProps, {}),
)(NavContainer);
