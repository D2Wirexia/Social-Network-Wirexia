import React from "react"
import universal from "./formControl.module.css"
import {Field, WrappedFieldProps} from "redux-form"
import {ValidatorsType} from "../../../utils/validators/validators"
/*
type FormControlPropsType = {
	input: any
	meta: {touched: boolean, error: string}
	el: string
}
const FormControl: React.FC<FormControlPropsType> = ({input, meta: {touched, error}, el, ...props}): any => {
	const hasError = touched && error;
	return(
		 <div className={universal.formControl + " " + (hasError ? universal.error : "")}>
			 <div>{React.createElement(el, {...input, ...props})}</div>
			 {hasError && <span>{error}</span>}
		 </div>
	)
}

export const Textarea: React.FC<WrappedFieldProps> = (props) => {
	return <FormControl {...props} el="textarea" />

}
export const Input: React.FC<WrappedFieldProps> = (props) => {
	return <FormControl {...props} el="input" />
}
type CreateFieldType = {
	placeholder: string
	component: string
	name: string
	validate: object
	props: any
	text: string

}
export const createField = (placeholder: string | undefined, component: React.FC<WrappedFieldProps>,
							name: string, validate: Array<ValidatorsType>,
							props = {}, text= "") => (
	 <div className={universal.createField}>
		 <div className={universal.fieldBlock}>
		 	<Field placeholder={placeholder} component={component} name={name}
					 validate={validate} {...props}/>
		 </div>
		 <div className={universal.fieldText}>{text}</div>
	 </div> );*/

const FormControl = ({input, meta: {touched, error}, el, ...props}) => {
	const hasError = touched && error;
	return (
		 <div className={universal.formControl + " " + (hasError ? universal.error : "")}>
			 <div>
				 {React.createElement(el, {...input, ...props})}
			 </div>
			 {hasError && <span>{error}</span>}
		 </div>
	)
};
export const Textarea = props => {
	return <FormControl {...props} el="textarea"/>
};
export const Input = props => {
	return <FormControl {...props} el="input"/>
};
export const createField = (placeholder, component, name, validate, props = {}, text = "") => (
	 <div className={universal.createField}>
		 <div className={universal.fieldBlock}>
			 <Field placeholder={placeholder} component={component} name={name}
					  validate={validate} {...props}/>
		 </div>
		 <div className={universal.fieldText}>{text}</div>
	 </div>);