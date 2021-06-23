import React from 'react';
import logoWhite from "../../img/logoWhite.png";
import logoDark from "../../img/logoBlack.png";
import universal from './Header.module.css'
import {NavLink} from "react-router-dom";

type PropsType = {
	darkMode: boolean
	isAuth: boolean
	login: string | null
	logoutThunk: () => void
}
const Header: React.FC<PropsType> = React.memo(props => {
	return(
		 <div className={props.darkMode ? universal.headerDark : universal.header}>
			 <img src={props.darkMode ? logoWhite : logoDark} className={universal.App_logo} alt="logo" />
			 <div className={universal.RT}>This site is made on React</div>
			 <div className={universal.login}>
				 {
					 props.isAuth
						  ? <div><span>{props.login}</span>
							  <i className="fas fa-sign-out-alt" onClick={props.logoutThunk}/>
						  </div>
						  :   <NavLink to={'/login'}>Login</NavLink>
				 }
			 </div>
		 </div>

	);
});
export default Header;