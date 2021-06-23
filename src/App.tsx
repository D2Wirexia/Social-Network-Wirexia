import React, {ComponentType} from 'react';
import './App.css';
import {BrowserRouter, Redirect, Route, withRouter} from "react-router-dom";
import Music from "./components/Music/Music"
import HeaderContainer from "./components/Header/HeaderContainer";
import {connect} from 'react-redux'
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import store, {AppStateType} from "./redux/redux-store";
import {Provider} from "react-redux";
import NavContainer from "./components/Nav/NavContainer";
import {withSuspense} from "./components/Hoc/withSuspense";

const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
const Login = React.lazy(() => import("./components/Login/Login"))
const SettingsContainer = React.lazy(() => import("./components/Settings/SettingsContainer"))
const UsersContainer = React.lazy(() => import("./components/Users/UsersContainer"))
const NewsContainer = React.lazy(() => import("./components/News/NewsContainer"))

const SuspendedProfile = withSuspense(ProfileContainer)
const SuspendedDialog = withSuspense(DialogsContainer)
const SuspendedNews = withSuspense(NewsContainer)
const SuspendedSettings = withSuspense(SettingsContainer)
const SuspendedUsers = withSuspense(UsersContainer)
const SuspendedLogin = withSuspense(Login)


type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    initializeApp: () => void
}

class App extends React.PureComponent<MapPropsType & DispatchPropsType> {
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
                    <Route exact path="/" render={() => <Redirect to="/profile"/>}/>
                    <Route path="/profile/:userId?" render={() => <SuspendedProfile/>}/>
                    <Route path="/dialogs/:userId?" render={() => <SuspendedDialog/>}/>
                    <Route path="/news" render={() => <SuspendedNews/>}/>
                    <Route path="/music" component={Music}/>
                    <Route path="/settings" render={() => <SuspendedSettings/>}/>
                    <Route path="/users" render={() => <SuspendedUsers/>}/>
                    <Route path="/login" render={() => <SuspendedLogin/>}/>
                </div>
            </div>
        );
    }
}

let mapStateToProps = (state: AppStateType) => {
    return {
        initialized: state.appPage.initialized,
    }
};
let AppContainer = compose<ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);

const MainApp: React.FC = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        </BrowserRouter>
    );
};

export default MainApp;