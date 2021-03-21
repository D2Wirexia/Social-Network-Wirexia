import React from "react";
import universal from './Pagination.module.css'

let Paginator = ({totalUsersCount, pageSize, currentPage, onPageChanged}) => {
	let pageCount = Math.ceil(totalUsersCount / pageSize);
	let pages = [];
	for (let i = 1; i <= pageCount; i++) {
		pages.push(i);
	}

	return (
		 <div className={universal.pagination}>
			 {
				 pages.map(p => <span key={p}
					  className={currentPage === p ? universal.selectedPage : ""}
					  onClick={() => onPageChanged(p)}>{p}</span>)
			 }
		 </div>
	)
};
export default Paginator;