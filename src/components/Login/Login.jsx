import React from 'react';
import {reduxForm} from "redux-form";
import {createField, Input} from "../common/formControls/formControls";
import {maxLengthCreator, minLengthCreator, required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {loginThunk} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import universal from "./Login.module.css";

const maxLength50 = maxLengthCreator(50);
const minLength2 = minLengthCreator(6);

const Login = React.memo(props => {
	const onSubmit = (formData) => {
		props.loginThunk(formData.email, formData.password, formData.rememberMe)
	};
	if (props.isAuth) return <Redirect to={'/profile'}/>;
	const url = "https://images.pexels.com/photos/2425664/pexels-photo-2425664.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"

	return (
		 <div className={universal.form}>
			 <div className={universal.backgroundLogin}>
				 <img src={url} alt="backgroundLogin"/>
			 </div>
			 <LoginReduxForm onSubmit={onSubmit}/>
		 </div>
	)
});
const LoginForm = ({handleSubmit, error}) => {
	return (
		 <form onSubmit={handleSubmit}>
			 <h1>Login</h1>
			 {error && <div className={universal.error}>{error}</div>}
			 <div className={universal.input_container}>
				 {createField("Login", Input, "email", [required, maxLength50, minLength2])}
			 </div>
			 <div className={universal.input_container}>
				 {createField("Password", Input, "password", [required, maxLength50, minLength2], {type: "password"})}
			 </div>
			 <div className={universal.input_container}>
				 <div className={universal.checker}>
					 {createField(null, Input, "rememberMe", [], {type: "checkbox"}, "remember me")}
				 </div>
			 </div>
			 <div>
				 <button className={universal.btn}>Login</button>
			 </div>
		 </form>
	)
};
const LoginReduxForm = reduxForm({form: 'login'})(LoginForm);
let mapStateToProps = (state) => {
	return {
		isAuth: state.authPart.isAuth,
	}
};
export default connect(mapStateToProps, {loginThunk})(Login);