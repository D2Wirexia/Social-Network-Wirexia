import React from 'react';
import universal from './Friends.module.css';
import {NavLink} from 'react-router-dom';

const OneDialog = (props) => {
	return(
		 <NavLink to={'/dialogs/' + props.id}>
			 <div className={universal.dialog} onClick={()=>props.receiveIdFriend(props.id)}>
				<div className={universal.imgFriend}>
					<img src={props.photoUrl} alt="photoProfile"/>
				</div>

				<div className={universal.nameFriend}>{props.name}</div>

			 </div>
		 </NavLink>
	);
};

const Friends = (props) => {

	let dialogElement = props.dialogData.map(dialog => {
		return <OneDialog name={dialog.name} id={dialog.id} photoUrl={dialog.photoUrl} receiveIdFriend={props.receiveIdFriend}/>
	});
	return (
		 <div className={universal.mainDialog}>
			 <div className={universal.friendsDialog}>
				 {dialogElement}
			 </div>
		 </div>

	);
};

export default Friends;
