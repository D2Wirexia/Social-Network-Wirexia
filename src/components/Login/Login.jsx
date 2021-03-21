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
	return (
		 <div>
			 <h1>Login</h1>
			 <LoginReduxForm onSubmit={onSubmit}/>
		 </div>
	)
});
const LoginForm = ({handleSubmit, error}) => {
	return (
		 <form onSubmit={handleSubmit}>
			 {error && <div className={universal.error}>{error}</div>}
			 {createField("Login", Input, "email", [required, maxLength50, minLength2])}
			 {createField("Password", Input, "password", [required, maxLength50, minLength2], {type: "password"})}
			 {createField(null, Input, "rememberMe", [], {type: "checkbox"}, "remember me")}
			 <div>
				 <button>Login</button>
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