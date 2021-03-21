import React from "react";
import universal from './Profile.module.css'
import MyPostContainer from "./Posts/MyPostContainer";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = React.memo(props => {

	return(
		 <div className={universal.content}>
			 <ProfileInfo profile={props.profile} mainProfile={props.mainProfile}
							  status={props.status} statusUpdateThunk={props.statusUpdateThunk}/>
			 <MyPostContainer />
		 </div>
	);
});

export default Profile;