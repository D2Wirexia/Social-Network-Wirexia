import React from 'react';
import {addAnswerZe, addMessage} from "../../redux/messageReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../Hoc/withAuthRedirect";
import {compose} from "redux";

class DialogsContainer extends React.Component{
	render() {
		return <Dialogs {...this.props}/>
	}
}

let mapStateToProps = (state) => {
	return {
		messageData: state.messangerPage.messageData,
		dialogData: state.messangerPage.dialogData,
		ZeChat: state.messangerPage.ZeChat,

	}
};

export default compose(
	 connect(mapStateToProps, {addMessage, addAnswerZe}),
	 withAuthRedirect
)(DialogsContainer);
