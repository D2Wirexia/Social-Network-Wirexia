import React from 'react';
import './App.css';
import Nav from "./components/Nav/Nav";
import {BrowserRouter, Route, withRouter} from "react-router-dom";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import News from "./components/News/News";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect} from 'react-redux'
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import store from "./redux/redux-store";
import {Provider} from "react-redux";

class App extends React.PureComponent {
	componentDidMount() {
		this.props.initializeApp();
	}
	render() {
		if (!this.props.initialized) return <Preloader/>;
		return (
			 <div className="app-writer">
				 <HeaderContainer/>
				 <Nav state={this.props.state}/>
				 <div className="app_content">
					 <Route path="/profile/:userId?" render={() => <ProfileContainer/>}/>
					 <Route path="/dialogs" render={() => <DialogsContainer/>}/>
					 <Route path="/news" component={News}/>
					 <Route path="/music" component={Music}/>
					 <Route path="/settings" component={Settings}/>
					 <Route path="/users" render={() => <UsersContainer/>}/>
					 <Route path="/login" render={() => <Login/>}/>
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