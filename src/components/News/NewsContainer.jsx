import React from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import News from "./News";

class NewsContainer extends React.Component{
	render() {
		return <News {...this.props}/>
	}
}

let mapStateToProps = (state) => {
	return {
		category: state.newsPage.category
	}
};

export default compose(
	 connect(mapStateToProps, {}),
)(NewsContainer);
