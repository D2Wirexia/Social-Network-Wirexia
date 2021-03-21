import React, {useEffect, useState} from "react";

const ProfileStatusWithHooks = React.memo(props => {
	let [editMode, setEditMode] = useState(false);
	let [status, setStatus] = useState(props.status);

	const activateEditMode = () => {
		setEditMode(true)
	};
	const deactivateEditMode = () => {
		setEditMode(false);
		props.statusUpdateThunk(status);
	};
	const onStatusChange = (e) => {
		setStatus(e.target.value)
	};
	useEffect(() => {
		setStatus(props.status)
	}, [props.status]);

	return(
		 <>
			 {!editMode &&
			 <div>
				 <span onDoubleClick={activateEditMode}>{props.status || 'Edit status'}</span>
			 </div>
			 }
			 {editMode &&
			 <div>
				 <input onBlur={deactivateEditMode}
						  autoFocus={true}
						  onChange={onStatusChange}
						  value={status}/>
			 </div>
			 }
		 </>
	)
});

export default ProfileStatusWithHooks;