import React from "react";
import universal from './DarkMode.module.css'

const DarkMode = React.memo(props => {
	return (
		 <div className={universal.darkMode}>
			 <span>Night Mode</span>
			 <div className={universal.switch}>
				 <input type="checkbox" checked={props.darkMode}
						  onChange={() => props.setDarkMode(!props.darkMode)}/>
				 <label><i/></label>
			 </div>
		 </div>
	)
});
export default DarkMode;