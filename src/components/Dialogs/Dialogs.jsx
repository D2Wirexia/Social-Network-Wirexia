import React, {useEffect, useState} from 'react';
import universal from './Dialogs.module.css';
import Friends from "./Friends/Friends";
import Message from "./Message/Message";
import {reduxForm} from "redux-form";
import {createField, Textarea} from "../common/formControls/formControls";
import {maxLengthCreator, minLengthCreator, required} from "../../utils/validators/validators";

const maxLength500 = maxLengthCreator(500);
const minLength2 = minLengthCreator(1);
const Dialogs = (props) => {
	let [idFriend, setIdFriend] = useState(1);
	let [whomToSend, setWhomToSend] = useState('Vladimir Zelensky');
	useEffect(() => {
		switch (idFriend) {
			case 1: return setWhomToSend('Vladimir Zelensky');
			case 2: return setWhomToSend('Nastenka');
			case 3: return setWhomToSend('Dima BigBoss');
			case 4: return setWhomToSend('Artem lowSkill');
			default: return 0;
		}
	}, [idFriend]);
	const receiveIdFriend = (id) => {
		setIdFriend(id)
	};

	let onSubmit = (values) => {
		props.addMessage(values.newMassage, whomToSend);
		setTimeout(()=> {
			const re = /\?/g;
			let firstWord = values.newMassage.split(" ");
			let scriptBot;
			switch (firstWord[0].toLowerCase().replace(re, '')) {
				case "какие": scriptBot = props.ZeChat.what;
					break;
				case "кто": scriptBot = props.ZeChat.who;
					break;
				case "где": scriptBot = props.ZeChat.where;
					break;
				case "сколько": scriptBot = props.ZeChat.howMuch;
					break;
				case "когда": scriptBot = props.ZeChat.when;
					break;
				default: return 0;
			}
			let res = scriptBot.sort(function () {
				return Math.random() - 0.5
			});
			return props.addAnswerZe(res[0]);
		}, 20)

	};
	return (
		 <div>
			 <div className={universal.mainDialog}>
				 <Friends dialogData={props.dialogData} receiveIdFriend={receiveIdFriend} idFriend={idFriend}/>
				 <div className={universal.mes}>
					 <div className={universal.sms}>
						 <Message message={props.messageData} whomToSend={whomToSend}
									 dialogData={props.dialogData} idFriend={idFriend}/>
					 </div>
					 <div className={universal.dataEntry}>
						 <MassageReduxForm onSubmit={onSubmit}/>
					 </div>
				 </div>
			 </div>
		 </div>
	);
};
const MassageForm = (props) => {
	return (
		 <form onSubmit={props.handleSubmit}>
			 {createField("Message...", Textarea, "newMassage", [required, maxLength500, minLength2])}
			 <button className={universal.send}>Send</button>
		 </form>
	)
};
const MassageReduxForm = reduxForm({form: 'massage'})(MassageForm);
export default Dialogs;
