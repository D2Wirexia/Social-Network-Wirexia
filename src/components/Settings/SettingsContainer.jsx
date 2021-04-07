import React from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import Settings from "./Settings";
import {saveProfileThunk, setDarkMode} from "../../redux/settingsReducer";
import {setMainProfileThunk} from "../../redux/auth-reducer";
import Preloader from "../common/Preloader/Preloader";
import {withAuthRedirect} from "../Hoc/withAuthRedirect";

class SettingsContainer extends React.PureComponent{
	componentDidMount() {
		this.props.setMainProfileThunk(this.props.mainIdProfile);
	}
	componentDidUpdate(prevProps, prevState, snapshot) {
		/*if(prevProps.mainProfile !== this.props.mainProfile){
			this.props.setMainProfileThunk(this.props.mainIdProfile);
		}*/
	}

	render() {
		return this.props.mainProfile ? <Settings {...this.props}/> : <Preloader/>
	}
}

let mapStateToProps = (state) => {
	return {
		darkMode: state.settingPage.darkMode,
		mainProfile: state.authPart.mainProfile,
		mainIdProfile: state.authPart.id
	}
};

export default compose(
	 connect(mapStateToProps, {setDarkMode, setMainProfileThunk, saveProfileThunk}),
	 withAuthRedirect
)(SettingsContainer);
