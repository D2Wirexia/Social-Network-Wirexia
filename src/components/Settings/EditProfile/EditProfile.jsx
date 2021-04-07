import React from "react";
import {createField, Input, Textarea} from "../../common/formControls/formControls";
import universal from "./EditProfile.module.css";
import {reduxForm} from "redux-form";
import './../../../css/all.min.css'
import ava from './../../../img/1.jpg'

const EditProfile = ({profile, saveProfileThunk}) => {
	const onSubmit = (formData) => {
		saveProfileThunk(formData);
	};

	return (
		 <div>
			 <SettingsReduxForm onSubmit={onSubmit} profile={profile} initialValues={profile}/>
		 </div>
	)
};
const SettingsForm = ({handleSubmit, profile, error}) => {
	return (
		 <form onSubmit={handleSubmit}>

			 <div className={universal.headerSettingsProfile}>
				 <div className={universal.photoLarge}>
					 <img src={profile.photos.large || ava}
																		  alt={"ava"}/></div>
				 <div className={universal.aboutMe}>
					 <span>About Me</span>
					 {createField("Tell something about yourself...", Textarea, "aboutMe", [])}
				 </div>
			 </div>
			 <div className={universal.titleSocialNetwork}>
				 —————~ஜ۩۞۩ஜ~————— Social Network —————~ஜ۩۞۩ஜ~————— </div>
			 <div className={universal.socialNetwork}>
				 <div className={universal.vk}>
					 <div className={universal.blockI}>
					 <i className="fab fa-vk"/></div>
					 {createField("VK.com", Input, "contacts.vk", [])}
				 </div>
				 <div className={universal.facebook}>
					 <div className={universal.blockI}>
						 <i className="fab fa-facebook-square"/></div>
					 {createField("Facebook", Input, "contacts.facebook", [])}
				 </div>
				 <div className={universal.twitter}>
					 <div className={universal.blockI}>
						 <i className="fab fa-twitter"/></div>
					 {createField("Twitter", Input, "contacts.twitter", [])}
				 </div>
				 <div className={universal.instagram}>
					 <div className={universal.blockI}>
					 <i className="fab fa-instagram"/>
					 </div>
					 {createField("Instagram", Input, "contacts.instagram", [])}
				 </div>
				 <div className={universal.youtube}>
					 <div className={universal.blockI}>
					 <i className="fab fa-youtube"/>
					 </div>
					 {createField("YouTube", Input, "contacts.youtube", [])}
				 </div>
				 <div className={universal.github}>
					 <div className={universal.blockI}>
					 <i className="fab fa-github"/>
					 </div>
					 {createField("GitHub", Input, "contacts.github", [])}
				 </div>
				 <div className={universal.website}>
					 <div className={universal.blockI}>
					 <i className="fas fa-blog"/>
					 </div>
					 {createField("Web Site", Input, "contacts.website", [])}
				 </div>
				 <div className={universal.mainLink}>
					 <div className={universal.blockI}>
					 <i className="fas fa-link"/>
					 </div>
					 {createField("Main Link", Input, "contacts.mainLink", [])}
				 </div>
			 </div>
			 <div className={universal.titleJob}>
				 <span>━━━━━━━❮◆❯━━━━━━━ Work Activity ━━━━━━━❮◆❯━━━━━━━</span>
				 <div className={universal.checkedJob}>
				 <i className="fas fa-briefcase"/>
				 {createField(null, Input, "lookingForAJob", [],
					  {type: "checkbox", value: profile.lookingForAJob}, "Looking for a job")}
				 {profile.lookingForAJob}
				 </div>
				 <div className={universal.descriptionJob}>
					 Looking for a job description
				 {createField("Looking for a job description", Textarea, "lookingForAJobDescription", [])}
				 </div>
			 </div>
			 {error && <div className={universal.error}>{error}</div>}
			<div className={universal.btnUpdateProfile}>
			 <button className={universal.send}>Save</button>
			 </div>
		 </form>
	)
};
const SettingsReduxForm = reduxForm({form: 'settingsProfile'})(SettingsForm);
export default EditProfile;