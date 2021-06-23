import preLoader from "../../../img/loading.gif";
import React from "react";
import w from './Preloader.module.css'

const Preloader = () => {
	return(
		 <div className={w.loader}>
			 <img src={preLoader} alt="preLoader"/>
		 </div>
	);
}
export default Preloader;
