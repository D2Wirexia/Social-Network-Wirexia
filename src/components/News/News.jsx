import React from 'react';
import universal from './News.module.css';
import NewsCategory from "./NewsCategory/NewsCategory";

const News = (props) => {
	return (
		 <div className={universal.title}>
			 <div>
				 {
					 props.category.map((category, index) =>
						  <NewsCategory key={index} img={category.img} text={category.text}
											 title={category.title} link={category.link} date={category.date}/>)
				 }
			 </div>
		 </div>
	);
};
export default News;