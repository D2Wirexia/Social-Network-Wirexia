import React from "react";
import universal from './NewsCategory.module.css'

type PropsType = {
	img: string
	text: string
	title: string
	link: string
	date: string
}
const NewsCategory: React.FC<PropsType> = ({img, text, title, link, date}) => {
	return(
		 <div className={universal.category}>
			 <h4>{title}
			 {
			 	link ? <a href={link}>(перейти)</a> : null
			 }
			 </h4>
			 <div className={universal.blockImg}>
			 	<img src={img} alt="newsImg"/>
			 </div>
			 <div className={universal.insideImg}>
				 <p>{text}</p>
				 <span>{date}</span>
			 </div>

		 </div>
	)
};

export default NewsCategory;