import React from "react";
import universal from './MyPost.module.css'
import SimplePost from "./SimplePost/SimplePost";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, minLengthCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../common/formControls/formControls";

const maxLength500 = maxLengthCreator(500);
const minLength2 = minLengthCreator(2);

const MyPost = React.memo(props => {

	const onSubmit = (values) => {
		props.addPost(values.newPostBody);
	};
	return(
		 <div className={universal.MyPost}>
			 <div className={universal.post}>My Post</div>
			 <div className={universal.block}>
				 <PostReduxForm onSubmit={onSubmit}/>
			 </div>
			 <div className={universal.simplePost}>
				 <SimplePost postData={props.postData} addLike={props.addLike}
								 pushIdLikes={props.pushIdLikes} isShowIdLike={props.isShowIdLike}/>
			 </div>
		 </div>
	);
});
const PostForm = (props) => {
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

const PostReduxForm = reduxForm({form: 'post'})(PostForm);

export default MyPost;