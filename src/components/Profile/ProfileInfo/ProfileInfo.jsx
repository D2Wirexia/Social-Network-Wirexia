import React from "react";
import universal from "./ProfileInfo.module.css";
import Preloader from "../../common/Preloader/Preloader";
import headerImg from './../../../img/snw.png';
import ProfileStatusWithHooks from "./PrifileStatus/ProfileStatusWithHooks";
import './../../../css/all.min.css';

let ProfileInfo = React.memo(
	 ({profile, status, statusUpdateThunk, isOwner, savePhoto}) => {
	if (!profile){
		return <Preloader/>
	}

	const onMainPhotoSelected = event => {
		if(event.target.files.length){
			savePhoto(event.target.files[0]);
		}
	};
	return(
		 <>
			 <div className={universal.backLogo}>
				 <img src={headerImg} alt="headerImg"/>
			 </div>
			 <div className={universal.profile}>
				 <div className={universal.ava}>
				 <img src={profile.photos.large || "https://my-engine.ru/modules/users/avatar.png"} alt="ava"/>
					 {isOwner &&
					 <div className={universal.downloadPhoto}>
					 <i className="fas fa-camera"/>
				 	<input type={"file"} onChange={onMainPhotoSelected}/>
				 </div>
					 }
				 </div>
				 <div className={universal.leftBlock}>
					 <div className={universal.name_profile}>{profile.fullName}</div>
					 <div className={universal.status_profile}>
						 <ProfileStatusWithHooks status={status} statusUpdateThunk={statusUpdateThunk} isOwner={isOwner}/>
					 </div>
					 <ul className={universal.info_profile}>
						 {
							 profile.aboutMe
								  ? <li><b>About me:</b> {profile.aboutMe}</li>
								  : <li><b>About me:</b> none</li>
						 }
						 {
							 profile.lookingForAJobDescription
								  ? <li><b>Activity:</b> {profile.lookingForAJobDescription}</li>
								  : <li><b>Activity:</b> none</li>
						 }
						 {Object.keys(profile.contacts).map(key => {
						 	return <ContactsProfile key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
						 })}
						 <li><b>Looking for a job:</b> {
							 profile.lookingForAJob
							  ? <input type={"checkbox"} checked={true} onChange={()=>{return true}}/>
							  : <input type={"checkbox"} checked={false} onChange={()=>{return false}}/>
						 }</li>
					 </ul>
				 </div>
			 </div>

		 </>
	)
});

export const ContactsProfile = ({contactTitle, contactValue}) => {
	return <li style={{marginLeft: "10px"}}>
		{contactValue && <><b>{contactTitle}:</b> {contactValue}</>}

	</li>
};

export default ProfileInfo;