import React, {useEffect, useState} from "react";
import universal from './Pagination.module.css'
import './../../../css/all.min.css'

let Paginator = ({totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 10}) => {
	let pageCount = Math.ceil(totalItemsCount / pageSize);
	let pages = [];
	for (let i = 1; i <= pageCount; i++) {
		pages.push(i);
	}
	let portionCount = Math.ceil(pageCount / portionSize);
	let [portionNumber, setPortionNumber] = useState(1);
	let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
	let rightPortionPageNumber = portionNumber * portionSize;
	useEffect(()=>setPortionNumber(Math.ceil(currentPage/portionSize)), [currentPage]);
	const disabledBtn = {
		background: "#243d74",
		cursor: "auto",
		color: "#b1b1b1",
		opacity: 0.3
	};
	return (
		 <div className={universal.pagination}>
			 <button disabled={portionNumber <= 1} style={portionNumber <= 1 ? disabledBtn : null}
						onClick={() => setPortionNumber(portionNumber - 1)} >
				 <i className="fas fa-chevron-left"/></button>
			 {
				 pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
					  .map(p => <span key={p}
											 className={currentPage === p ? universal.selectedPage : ""}
											 onClick={() => onPageChanged(p)}>{p}</span>)
			 }
			 <button disabled={portionNumber >= portionCount} onClick={() => setPortionNumber(portionNumber + 1)} >
				 <i className="fas fa-chevron-right"/></button>


		 </div>
	)
};
export default Paginator;