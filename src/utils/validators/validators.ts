export type ValidatorsType = (value: string) => string | undefined

export const required: ValidatorsType = value => {
	if(value) return undefined;
	return 'field is required'
};
export const maxLengthCreator = (maxLength: number): ValidatorsType => value => {
	if(value && value.length > maxLength) return `max length is ${maxLength} symbols`;
	return undefined
};
export const minLengthCreator = (minLength: number): ValidatorsType => value => {
	if(value && value.length < minLength) return `min length is ${minLength} symbols`;
	return undefined
};


