import React from 'react';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../../redux/redux-store";

type PropsType = {
    isAuth: boolean
}
let mapStateToPropsForRedirect = (state: AppStateType): PropsType => {
    return {
        isAuth: state.authPart.isAuth,
    }
};

export function withAuthRedirect<WCP>(WrappedComponent: React.ComponentType<WCP>) {
    const RedirectComponent: React.FC<PropsType> = (props) => {
        const {isAuth, ...restProps} = props
        if (!isAuth) return <Redirect to={'/login'}/>;
        return <WrappedComponent {...restProps as WCP} />
    }
    let ConnectedAuthRedirectComponent = connect<PropsType, {}, WCP, AppStateType>(mapStateToPropsForRedirect)(RedirectComponent);
    return ConnectedAuthRedirectComponent;
};
