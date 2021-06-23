import React from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import News from "./News";
import {categoryNewsType} from "../../types/types";
import {AppStateType} from "../../redux/redux-store";
type MapStateToPropsType = {
	category: Array<categoryNewsType>
}
type MapDispatchToPropsType = {

}
type OwnPropsType = {}
type PropsType = MapStateToPropsType & MapDispatchToPropsType
class NewsContainer extends React.Component<PropsType>{
	render() {
		return <News {...this.props}/>
	}
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
	return {
		category: state.newsPage.category
	}
};

export default compose(
	 connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(mapStateToProps, {}),
)(NewsContainer);
