import React from 'react';
import universal from './News.module.css';
import NewsCategory from "./NewsCategory/NewsCategory";
import {categoryNewsType} from "../../types/types";

type PropsType ={
	category: Array<categoryNewsType>
}
const News: React.FC<PropsType> = ({category}) => {
	return (
		 <div className={universal.title}>
			 <div>
				 {
					 category.map((category, index) =>
						  <NewsCategory key={index} img={category.img} text={category.text}
											 title={category.title} link={category.link} date={category.date}/>)
				 }
			 </div>
		 </div>
	);
};
export default News;