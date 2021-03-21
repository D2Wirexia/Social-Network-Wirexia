import React from "react";
import universal from "./ProfileInfo.module.css";
import Preloader from "../../common/Preloader/Preloader";
import headerImg from './../../../img/snw.png';
import ProfileStatusWithHooks from "./PrifileStatus/ProfileStatusWithHooks";

let ProfileInfo = React.memo(
	 ({profile, status, statusUpdateThunk}) => {
	if (!profile){
		return <Preloader/>
	}
	return(
		 <>
			 <div className={universal.backLogo}>
				 <img src={headerImg} />
			 </div>
			 <div className={universal.profile}>
				 <img src={profile.photos.large
				 ? profile.photos.large
					  : "https://my-engine.ru/modules/users/avatar.png"
				 } />
				 <div className={universal.leftBlock}>
					 <div className={universal.name_profile}>{profile.fullName}</div>
					 <div className={universal.status_profile}>
						 <ProfileStatusWithHooks status={status} statusUpdateThunk={statusUpdateThunk}/>
					 </div>
					 <ul className={universal.info_profile}>
						 <li>About me: {profile.aboutMe}</li>
						 {
							 profile.lookingForAJobDescription
							  ? <li>Activity: {profile.lookingForAJobDescription}</li>
								  : <li>Activity: none</li>
						 }
						 <li>City: Sumy</li>
						 {
							 profile.contacts.github
								  ? <li>GitHub: {profile.contacts.github}</li>
								  : null
						 }
						 {
							 profile.contacts.vk
								  ? <li>VK: {profile.contacts.vk}</li>
								  : null
						 }
						 {
							 profile.contacts.facebook
								  ? <li>Facebook: {profile.contacts.facebook}</li>
								  : null
						 }
						 {
							 profile.contacts.instagram
								  ? <li>Instagram: {profile.contacts.instagram}</li>
								  : null
						 }
						 {
							 profile.contacts.twitter
								  ? <li>Twitter: {profile.contacts.twitter}</li>
								  : null
						 }
						 {
							 profile.contacts.website
								  ? <li>Web Site: {profile.contacts.website}</li>
								  : null
						 }
						 {
							 profile.contacts.youtube
								  ? <li>YouTube: {profile.contacts.youtube}</li>
								  : null
						 }
						 {
							 profile.contacts.mainLink
								  ? <li>Min Link: {profile.contacts.mainLink}</li>
								  : null
						 }
						 <li>Looking for a job: {
							 profile.lookingForAJob
							  ? <input type={"checkbox"} checked={true}/>
							  : <input type={"checkbox"} checked={false}/>
						 }</li>
					 </ul>
				 </div>
			 </div>

		 </>
	)
});
export default ProfileInfo;