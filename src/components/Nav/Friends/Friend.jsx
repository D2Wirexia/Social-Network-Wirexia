import React from 'react';
import universal from './Friend.module.css';


const Friend = (props) => {
	return(
		 <div>
			 {props.friend}
		 </div>
	);

};

export default Friend;