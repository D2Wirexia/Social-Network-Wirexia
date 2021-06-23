import React from 'react';
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, Input} from "../common/formControls/formControls";
import {maxLengthCreator, minLengthCreator, required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {loginThunk} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import universal from "./Login.module.css";
import {AppStateType} from "../../redux/redux-store";

const maxLength50 = maxLengthCreator(50);
const minLength2 = minLengthCreator(6);
type MapStatePropsType = {
	isAuth: boolean
	captchaIUrl: string | null
}
type MapDispatchPropsType = {
	loginThunk: (email: string, password: string, rememberMe: boolean, captcha: string)=>void
}
type LoginFormValuesType = {
	email: string
	password: string
	rememberMe: boolean
	captcha: string
}
const Login: React.FC<MapStatePropsType & MapDispatchPropsType> = React.memo(props => {
	const onSubmit = (formData: LoginFormValuesType) => {
		props.loginThunk(formData.email, formData.password, formData.rememberMe, formData.captcha)
	};
	if (props.isAuth) return <Redirect to={'/profile'}/>;
	const url = "https://images.pexels.com/photos/2425664/pexels-photo-2425664.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"

	return (
		 <div className={universal.form}>
			 <div className={universal.backgroundLogin}>
				 <img src={url} alt="backgroundLogin"/>
			 </div>
			 <LoginReduxForm onSubmit={onSubmit} captchaIUrl={props.captchaIUrl}/>
		 </div>
	)
});
type LoginFormType = {
	captchaIUrl: string | null
}
const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormType> & LoginFormType> = ({handleSubmit, error, captchaIUrl}) => {
	return (
		 <form onSubmit={handleSubmit}>
			 <h1>Login</h1>
			 {error && <div className={universal.error}>{error}</div>}
			 <div className={universal.input_container}>
				 {createField("E-mail", Input, "email", [required, maxLength50, minLength2])}
			 </div>
			 <div className={universal.input_container}>
				 {createField("Password", Input, "password", [required, maxLength50, minLength2], {type: "password"})}
			 </div>
			 <div className={universal.input_container}>
				 <div className={universal.checker}>
					 {createField(undefined, Input, "rememberMe", [], {type: "checkbox"}, "remember me")}
				 </div>
			 </div>
			 {captchaIUrl && <div>
				 <img src={captchaIUrl} alt="captcha"/>
				 {createField("Anti-bot symbols", Input, "captcha", [required])}
			 </div>}
			 <div>
				 <button className={universal.btn}>Login</button>
			 </div>
		 </form>
	)
};
const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormType>({form: 'login'})(LoginForm);
let mapStateToProps = (state: AppStateType): MapStatePropsType => {
	return {
		isAuth: state.authPart.isAuth,
		captchaIUrl: state.authPart.captchaIUrl
	}
};
export default connect(mapStateToProps, {loginThunk})(Login);