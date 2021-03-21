import React from 'react';
import universal from './Nav.module.css'
import {NavLink} from "react-router-dom";
import "../../css/all.min.css"

const Nav = React.memo(props => {
	let friendsData = props.state.sideBar.friends;

					 /*let friendsData = store.getState().sideBar.friends.map(x => {
						 return <Friend friend={x.name} />
					 });*/


					 return (
						  <nav className={universal.nav}>
							  <div className={universal.post}>
								  <NavLink to="/profile" activeClassName={universal.active}>
									  <i className="fas fa-address-card"></i>Profile</NavLink>
							  </div>
							  <div className={universal.post}>
								  <NavLink to="/dialogs" activeClassName={universal.active}>
									  <i className="fas fa-envelope"></i>Messanger</NavLink>
							  </div>
							  <div className={universal.post}>
								  <NavLink to="/news" activeClassName={universal.active}>
									  <i className="fas fa-newspaper"></i>News</NavLink>
							  </div>
							  <div className={universal.post}>
								  <NavLink to="/music" activeClassName={universal.active}>
									  <i className="fas fa-music"></i>Music</NavLink>
							  </div>
							  <div className={universal.post}>
								  <NavLink to="/settings" activeClassName={universal.active}>
									  <i className="fas fa-tools"></i>Settings</NavLink>
							  </div>
							  <div className={universal.post}>
								  <NavLink to="/users" activeClassName={universal.active}>
									  <i className="fas fa-users"></i>Users</NavLink>
							  </div>


							  <div className={universal.blockFriend}>
								  <div className={universal.bestFriend}>
									  <div className={universal.photo}><img src={friendsData[0].photoUrl}/></div>
									  <div className={universal.friend}>{friendsData[0].name}</div>
								  </div>
								  <div className={universal.bestFriend}>
									  <div className={universal.photo}><img src={friendsData[1].photoUrl}/></div>
									  <div className={universal.friend}>{friendsData[1].name}</div>
								  </div>
								  <div className={universal.bestFriend}>
									  <div className={universal.photo}><img src={friendsData[2].photoUrl}/></div>
									  <div className={universal.friend}>{friendsData[2].name}</div>
								  </div>
							  </div>


						  </nav>
	);
});
export default Nav;