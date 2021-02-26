import React from 'react';
import logo from "../../logo.svg";
import universal from './Header.module.css'
import {NavLink} from "react-router-dom";

const Header = React.memo(props => {
	return(
		 <div className={universal.header}>
			 <img src={logo} className={universal.App_logo} alt="logo" />
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