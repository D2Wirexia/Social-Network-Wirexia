import React from 'react';
import universal from './Settings.module.css';

import DarkMode from "./DarkMode/DarkMode";
import EditProfile from "./EditProfile/EditProfile";

const Settings = (props) => {


	return (
		 <div className={universal.settings}>
			 <h2>Settings</h2>
			 <div className={universal.category}>Edit profile {props.mainProfile.fullName}#{props.mainProfile.userId}</div>
				<EditProfile profile={props.mainProfile} saveProfileThunk={props.saveProfileThunk}/>
			 <div className={universal.category}>Change interface styles </div>
			 <DarkMode setDarkMode={props.setDarkMode} darkMode={props.darkMode}/>
		 </div>
	);
};


export default Settings;
