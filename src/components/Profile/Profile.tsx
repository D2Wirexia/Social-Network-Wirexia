import React from "react";
import universal from './Profile.module.css'
import MyPostContainer from "./Posts/MyPostContainer";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import Preloader from "../common/Preloader/Preloader";
import {profileType} from "../../types/types";

type PropsType = {
	profile: profileType | null
	status: string
	savePhoto: (file: File) => void
	statusUpdateThunk: (status: string) => void
	isOwner: boolean
}
const Profile: React.FC<PropsType> = React.memo(props => {
	if (!props.profile){
		return <Preloader/>
	}
	return(
		 <div className={universal.content}>
			 <ProfileInfo profile={props.profile} isOwner={props.isOwner} savePhoto={props.savePhoto}
							  status={props.status} statusUpdateThunk={props.statusUpdateThunk}/>
			 <MyPostContainer />
		 </div>
	);
});

export default Profile;