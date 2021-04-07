import React from 'react';
import universal from './Nav.module.css'
import {NavLink} from "react-router-dom";
import "../../css/all.min.css"

const Nav = React.memo(props => {
	let friendsData = props.friends;
	return (
		 <nav className={props.darkMode ? universal.navDark : universal.nav}>
			 <div className={universal.post}>
				 <NavLink to="/profile" activeClassName={universal.active}>
					 <div className={universal.post_info}>
					 <i className="fas fa-address-card"/>Profile
					 </div>
					 </NavLink>
			 </div>
			 <div className={universal.post}>
				 <NavLink to="/dialogs" activeClassName={universal.active}>
					 <div className={universal.post_info}>
					 <i className="fas fa-envelope"/>Messanger
					 </div>
					 </NavLink>
			 </div>
			 <div className={universal.post}>
				 <NavLink to="/news" activeClassName={universal.active}>
					 <div className={universal.post_info}>
					 <i className="fas fa-newspaper"/>News
					 </div>
					 </NavLink>
			 </div>
			 <div className={universal.post}>
				 <NavLink to="/music" activeClassName={universal.active}>
					 <div className={universal.post_info}>
					 <i className="fas fa-music"/>Music
					 </div>
					 </NavLink>
			 </div>
			 <div className={universal.post}>
				 <NavLink to="/settings" activeClassName={universal.active}>
					 <div className={universal.post_info}>
					 <i className="fas fa-tools"/>Settings
					 </div>
					 </NavLink>
			 </div>
			 <div className={universal.post}>
				 <NavLink to="/users" activeClassName={universal.active}>
					 <div className={universal.post_info}>
					 <i className="fas fa-users"/>Users
					 </div>
					 </NavLink>
			 </div>
			 <div className={universal.blockFriend}>
				 <div className={universal.bestFriend}>
					 <div className={universal.photo}><img src={friendsData[0].photoUrl} alt="ava1"/></div>
					 <div className={universal.friend}>{friendsData[0].name}</div>
				 </div>
				 <div className={universal.bestFriend}>
					 <div className={universal.photo}><img src={friendsData[1].photoUrl} alt="ava2"/></div>
					 <div className={universal.friend}>{friendsData[1].name}</div>
				 </div>
				 <div className={universal.bestFriend}>
					 <div className={universal.photo}><img src={friendsData[2].photoUrl} alt="ava3"/></div>
					 <div className={universal.friend}>{friendsData[2].name}</div>
				 </div>
			 </div>
		 </nav>
	);
});
export default Nav;