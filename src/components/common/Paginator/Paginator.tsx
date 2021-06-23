import React, {useEffect, useState} from "react";
import universal from './Pagination.module.css'
import './../../../css/all.min.css'
import Preloader from "../Preloader/Preloader";

type PropsType = {
	totalItemsCount: number
	pageSize: number
	currentPage: number
	onPageChanged: (pageNumber: number) => void
	portionSize?: number
}
let Paginator: React.FC<PropsType> = ({totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 10}) => {
	let pageCount = Math.ceil(totalItemsCount / pageSize);
	let pages: Array<number> = [];
	for (let i = 1; i <= pageCount; i++) {
		pages.push(i);
	}
	let portionCount = Math.ceil(pageCount / portionSize);
	let [portionNumber, setPortionNumber] = useState<number>(1);
	let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
	let rightPortionPageNumber = portionNumber * portionSize;
	useEffect(()=>setPortionNumber(Math.ceil(currentPage/portionSize)), [currentPage]);

	if(pageCount === 0) return <Preloader/>;
	return (
		 <div className={universal.pagination}>
			 <button disabled={portionNumber <= 1} className={portionNumber <= 1 ? universal.disabledBtn : ""}
						onClick={() => setPortionNumber(portionNumber - 1)} >
				 <i className="fas fa-chevron-left"/></button>
			 {
				 pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
					  .map(p => <span key={p}
											 className={currentPage === p ? universal.selectedPage : ""}
											 onClick={() => onPageChanged(p)}>{p}</span>)
			 }
			 <button disabled={portionNumber >= portionCount}
					 className={portionNumber >= portionCount ? universal.disabledBtn : ""}
					 onClick={() => setPortionNumber(portionNumber + 1)} >
				 <i className="fas fa-chevron-right"/></button>


		 </div>
	)
};
export default Paginator;