import React from "react";
import universal from './Profile.module.css'
import MyPostContainer from "./Posts/MyPostContainer";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import Preloader from "../common/Preloader/Preloader";

const Profile = React.memo(props => {
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