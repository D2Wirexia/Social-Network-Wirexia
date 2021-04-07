import React from 'react';
import './App.css';
import {BrowserRouter, Route, withRouter} from "react-router-dom";
import Music from "./components/Music/Music"
import HeaderContainer from "./components/Header/HeaderContainer";
import {connect} from 'react-redux'
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import store from "./redux/redux-store";
import {Provider} from "react-redux";
import NavContainer from "./components/Nav/NavContainer";
import {withSuspense} from "./components/Hoc/withSuspense";

const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const Login = React.lazy(() => import("./components/Login/Login"));
const SettingsContainer = React.lazy(() => import("./components/Settings/SettingsContainer"));
const UsersContainer = React.lazy(() => import("./components/Users/UsersContainer"));
const NewsContainer = React.lazy(() => import("./components/News/NewsContainer"));

class App extends React.PureComponent {
	componentDidMount() {
		this.props.initializeApp();

	}
	render() {
		if (!this.props.initialized) return <Preloader/>;
		return (
			 <div className="app-writer">
				 <HeaderContainer/>
				 <NavContainer/>
				 <div className="app_content">
					 <Route path="/profile/:userId?" render={withSuspense(ProfileContainer)}/>
					 <Route path="/dialogs/:userId?" render={withSuspense(DialogsContainer)}/>
					 <Route path="/news" render={withSuspense(NewsContainer)}/>
					 <Route path="/music" component={Music}/>
					 <Route path="/settings" render={withSuspense(SettingsContainer)}/>
					 <Route path="/users" render={withSuspense(UsersContainer)}/>
					 <Route path="/login" render={withSuspense(Login)}/>
				 </div>
			 </div>
		);
	}
}

let mapStateToProps = (state) => {
	return {
		initialized: state.appPage.initialized,

	}
};
let AppContainer = compose(
	 withRouter,
	 connect(mapStateToProps, {initializeApp}))(App);

const MainApp = () => {
	return(
		 <BrowserRouter>
			 <Provider store={store}>
				 <AppContainer state={store.getState()}/>
			 </Provider>
		 </BrowserRouter>
	);
};

export default MainApp;