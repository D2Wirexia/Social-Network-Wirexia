import React from "react";
import universal from './DarkMode.module.css'
import {actions} from "../../../redux/settingsReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";

type PropsType = {

}
const DarkMode: React.FC<PropsType> = React.memo(() => {
	const dispatch = useDispatch()
	const darkMode = useSelector((state: AppStateType) => state.settingPage.darkMode)
	return (
		 <div className={universal.darkMode}>
			 <span>Night Mode</span>
			 <div className={universal.switch}>
				 <input type="checkbox" checked={darkMode}
						  onChange={() => dispatch(actions.setDarkMode(!darkMode))}/>
				 <label><i/></label>
			 </div>
		 </div>
	)
});
export default DarkMode;