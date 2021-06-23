import React, {ChangeEvent} from "react";
import universal from "./ProfileInfo.module.css";
import headerImg from './../../../img/snw.png';
import ProfileStatusWithHooks from "./PrifileStatus/ProfileStatusWithHooks";
import './../../../css/all.min.css';
import {contactsByProfileType, profileType} from "../../../types/types";

type PropsType = {
	profile: profileType
	status: string
	savePhoto: (file: File) => void
	statusUpdateThunk: (status: string) => void
	isOwner: boolean
}
let ProfileInfo: React.FC<PropsType> = React.memo(
	 ({profile, status, statusUpdateThunk, isOwner, savePhoto}) => {


	const onMainPhotoSelected = (event: ChangeEvent<HTMLInputElement>) => {
		if(event.target?.files?.length){
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
						 {Object.keys(profile.contacts).map((key: string) => {
							 return <ContactsProfile key={key} contactTitle={key} contactValue={profile.contacts[key as keyof contactsByProfileType]}/>
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
type ContactsProfileType = {
	contactTitle: string
	contactValue: string
}
export const ContactsProfile: React.FC<ContactsProfileType> = ({contactTitle, contactValue}) => {
	return <li style={{marginLeft: "10px"}}>
		{contactValue && <><b>{contactTitle}:</b> {contactValue}</>}

	</li>
};

export default ProfileInfo;