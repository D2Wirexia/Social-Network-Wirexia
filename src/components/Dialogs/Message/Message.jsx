import React from 'react';
import universal from './Message.module.css';
import myAva from './../../../img/myAva.jpg'

const Message = (props) => {
	const meMessage = {
		"justifyContent": "flex-end",
		"textAlign": "right",
		"marginRight": "10px"
	};
	const meMessageDiv = {
		"marginRight": "60px"
	};
	const otherMessage = {
		"justifyContent": "flex-start",
		"marginLeft": "10px"
	};
	const theirMessageDiv = {
		"marginLeft": "60px"
	};
	return (
		 <div className={universal.blockMessage}>
			 <div className={universal.backgroundImg}>
			 	<img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/acb65873426833.5c08f5634f7fb.png" alt="backgroundImg"/>
			 </div>
			 {
				 props.message[props.whomToSend].map(mes => <div className={universal.simpleMess}
																				 key={mes.id}>
					 {
						 mes.sender !== "me"
							  ? <div className={universal.enterMessage} style={otherMessage}>
								  <img src={props.dialogData[props.idFriend - 1].photoUrl} alt="photoFriend"/>
								  <div className={universal.discussion} style={theirMessageDiv}>{mes.message}</div>
							  </div>
							  : <div className={universal.enterMessage} style={meMessage}>
								  <div className={universal.discussion} style={meMessageDiv}>{mes.message}</div>
								  <img src={myAva} alt="photoFriend" />
							  </div>
					 }
				 </div>)
			 }
		 </div>
	);
};
export default Message;