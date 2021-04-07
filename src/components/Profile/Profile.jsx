import React from "react";
import universal from './Profile.module.css'
import MyPostContainer from "./Posts/MyPostContainer";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = React.memo(props => {

	return(
		 <div className={universal.content}>
			 <ProfileInfo profile={props.profile} isOwner={props.isOwner} savePhoto={props.savePhoto}
							  status={props.status} statusUpdateThunk={props.statusUpdateThunk}/>
			 <MyPostContainer />
		 </div>
	);
});

export default Profile;