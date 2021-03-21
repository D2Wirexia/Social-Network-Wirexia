import React from "react";

class ProfileStatus extends React.PureComponent{
	state = {
		editMode: false,
		status: this.props.status
	};
	activateEditMode = () => {
		this.setState({
			editMode: true
		})
	};
	deactivateEditMode = () => {
		this.setState({
			editMode: false
		});
		this.props.statusUpdateThunk(this.state.status);
	};
	onStatusChange = (e) => {
		this.setState({
			status: e.currentTarget.value
		})
	};
	componentDidUpdate(prevProps, prevState) {
		if(prevProps.status !== this.props.status){
			this.setState({
				status: this.props.status
			})
		}
	}

	render() {
		return(
			 <>
				 {!this.state.editMode &&
				 <div>
					 <span onDoubleClick={this.activateEditMode}>{this.props.status || 'Edit status'}</span>
				 </div>
				 }
				 {this.state.editMode &&
				 <div>
					 <input onBlur={this.deactivateEditMode}
							  autoFocus={true}
							  onChange={this.onStatusChange}
							  value={this.state.status}/>
				 </div>
				 }
			 </>
		)
	}
};



export default ProfileStatus;