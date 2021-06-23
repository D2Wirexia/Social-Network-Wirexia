import React from 'react';
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../Hoc/withAuthRedirect";
import {compose} from "redux";
import {AppStateType} from "../../redux/redux-store";
import {actions} from "../../redux/messageReducer";
import {dialogType, messageDataType, ZeChatType} from "../../types/types";

type MapStateToPropsType = {
	dialogData: Array<dialogType>
	messageData: messageDataType
	ZeChat: ZeChatType
}
type MapDispatchToPropsType = {
	addAnswerZe: (answerText: string) => void
}
class DialogsContainer extends React.Component<MapStateToPropsType & MapDispatchToPropsType> {
	render() {
		return <Dialogs {...this.props}/>
	}
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
	return {
		messageData: state.messangerPage.messageData,
		dialogData: state.messangerPage.dialogData,
		ZeChat: state.messangerPage.ZeChat,
	}
};

export default compose<React.ComponentType>(
	 connect<MapStateToPropsType, MapDispatchToPropsType, null, AppStateType>(mapStateToProps, {addAnswerZe: actions.addAnswerZe}),
	 withAuthRedirect
)(DialogsContainer);
