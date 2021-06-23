import React from "react";
import universal from './MyPost.module.css'
import SimplePost from "./SimplePost/SimplePost";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, minLengthCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../common/formControls/formControls";
import {useDispatch} from "react-redux";
import {actions} from "../../../redux/profileReducer";
import {postType} from "../../../types/types";

const maxLength500 = maxLengthCreator(500);
const minLength2 = minLengthCreator(2);

type PropsType = {
	postData: Array<postType>
	isShowIdLike: Array<number>
}
type PostFormValuesType = {
	newPostBody: string
}
const MyPost: React.FC<PropsType> = props => {
	const dispatch = useDispatch()
	const onSubmit = (values: PostFormValuesType) => {
		dispatch(actions.addPost(values.newPostBody));
	};
	return(
		 <div className={universal.MyPost}>
			 <div className={universal.post}>My Post</div>
			 <div className={universal.block}>
				 <PostReduxForm onSubmit={onSubmit}/>
			 </div>
			 <div className={universal.simplePost}>
				 <SimplePost postData={props.postData} isShowIdLike={props.isShowIdLike}/>
			 </div>
		 </div>
	);
};
const PostForm: React.FC<InjectedFormProps<PostFormValuesType>> = (props) => {
	return(
		 <form onSubmit={props.handleSubmit}>
			 <Field className={universal.textPost}
					  placeholder={"Enter to share news..."} name="newPostBody"
					  component={Textarea}
					  validate={[required, maxLength500, minLength2]}/>
			 <button className={universal.send}>Add post</button>
		 </form>
	)
};

const PostReduxForm = reduxForm<PostFormValuesType>({form: 'post'})(PostForm);

export default React.memo(MyPost);