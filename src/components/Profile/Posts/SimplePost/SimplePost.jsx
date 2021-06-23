import React, {useState} from "react";
import universal from './SimplePost.module.css';
import "../../../../css/all.min.css"
import {actions} from "../../../../redux/profileReducer";
import {useDispatch} from "react-redux";

const SimplePost = ({postData, isShowIdLike}) => {
    const dispatch = useDispatch()
    const [showLike, setShowLike] = useState(false)
    const withdrawLikes = () => {
        setShowLike(true)
    };
    const hideLikes = () => {
        setShowLike(false)
    };
    const countLike = (id) => {
        dispatch(actions.addLike(id))
    };
    const spaceBetweenLikes = (like) => {
        let strLike = String(like);
        let res = "";
        for (let i = strLike.length - 1; i >= 0; i--) {
            if (i === strLike.length - 4 || i === strLike.length - 7 || i === strLike.length - 10) {
                res += " " + strLike[i];
            } else {
                res += strLike[i]
            }
        }
        return res.split("").reverse().join("");
    };
    return (
        postData.map(post => <div key={post.id} className={universal.item}>
                <div className={universal.photo}>
                    <img src='https://download-cs.net/steam/avatars/3412.jpg' alt={"ava"}/>
                </div>
                <div className={universal.message}>{post.message}</div>
                <div className={universal.like}>
                    <i className="far fa-thumbs-up" onClick={() => countLike(post.id)}/>
                    <div
                        onMouseOver={() => {
                            withdrawLikes();
                            dispatch(actions.pushIdLikes(true, post.id))
                        }}
                        onMouseOut={() => {
                            hideLikes();
                            dispatch(actions.pushIdLikes(false, post.id))
                        }}>
                        {
                            (post.like > 1000000000) ? Math.round(post.like / 100000000) / 10 + "B" :
                                (post.like > 1000000) ? Math.round(post.like / 100000) / 10 + "M" :
                                    (post.like > 1000) ? Math.round(post.like / 100) / 10 + "k" :
                                        post.like
                        }
                    </div>
                    {
                        showLike && isShowIdLike.some(id => id === post.id) && post.like > 1000
                            ? <span>total value: {spaceBetweenLikes(post.like)}
                                <i className="fas fa-heart"/>
							  </span>
                            : null
                    }
                </div>
            </div>
        )
    );
}

export default SimplePost;