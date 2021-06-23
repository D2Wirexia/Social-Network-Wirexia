import React from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import Settings from "./Settings";
import {saveProfileThunk} from "../../redux/settingsReducer";
import {setMainProfileThunk} from "../../redux/auth-reducer";
import Preloader from "../common/Preloader/Preloader";
import {withAuthRedirect} from "../Hoc/withAuthRedirect";
import {AppStateType} from "../../redux/redux-store";
import {profileType} from "../../types/types";


type MapStateToPropsType = {
    mainProfile: profileType | null
    mainIdProfile: number | null
}
type MapDispatchToPropsType = {
    setMainProfileThunk: (mainIdProfile: number | null) => void
    saveProfileThunk: (profile: profileType) => void
};

type OwnPropsType = {}
type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType
class SettingsContainer extends React.PureComponent<PropsType> {
    componentDidMount() {
        this.props.setMainProfileThunk(this.props.mainIdProfile);
    }
    /*
        componentDidUpdate(prevProps, prevState, snapshot) {
            if (prevProps.mainProfile !== this.props.mainProfile) {
                this.props.setMainProfileThunk(this.props.mainIdProfile);
            }
        }*/
    render() {

        return this.props.mainProfile ? <Settings {...this.props}/> : <Preloader/>
    }
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        mainProfile: state.authPart.mainProfile,
        mainIdProfile: state.authPart.id
    }
};

export default compose<React.ComponentType>(
    connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(mapStateToProps, {setMainProfileThunk, saveProfileThunk}),
    withAuthRedirect
)(SettingsContainer);
