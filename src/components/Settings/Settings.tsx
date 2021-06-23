import React from 'react';
import universal from './Settings.module.css';

import DarkMode from "./DarkMode/DarkMode";
import EditProfile from "./EditProfile/EditProfile";
import {profileType} from "../../types/types";

type PropsType = {
	mainProfile: profileType | null
	saveProfileThunk: (profile: profileType) => void
}
const Settings: React.FC<PropsType> = ({mainProfile, saveProfileThunk}) => {

	return (
		 <div className={universal.settings}>
			 <h2>Settings</h2>
			 <div className={universal.category}>Edit profile {mainProfile?.fullName}#{mainProfile?.userId}</div>
				<EditProfile profile={mainProfile} saveProfileThunk={saveProfileThunk}/>
			 <div className={universal.category}>Change interface styles </div>
			 <DarkMode/>
		 </div>
	);
};


export default Settings;
