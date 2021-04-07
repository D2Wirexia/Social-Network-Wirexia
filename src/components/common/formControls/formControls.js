import React from "react";
import universal from "./formControl.module.css";
import {Field} from "redux-form";

const FormControl = ({input, meta: {touched, error}, el, ...props}) => {
	const hasError = touched && error;
	return(
		 <div className={universal.formControl + " " + (hasError ? universal.error : "")}>
			 <div>
				 {React.createElement(el, {...input, ...props})}
			 </div>
			 {hasError && <span>{error}</span>}
		 </div>
	)
};

export const Textarea = props => {
	return <FormControl {...props} el="textarea" />

};
export const Input = props => {
	return <FormControl {...props} el="input" />
};

export const createField = (placeholder, component, name, validate, props = {}, text="") => (
	 <div className={universal.createField}>
		 <div className={universal.fieldBlock}>
		 	<Field placeholder={placeholder} component={component} name={name}
					 validate={validate} {...props}/>
		 </div>
		 <div className={universal.fieldText}>{text}</div>
	 </div> );