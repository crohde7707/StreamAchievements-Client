import React from 'react';
import axios from 'axios';

import './modal.css';

class AchievementEditModal extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			title: ((props.achievement) ? props.achievement.title : ""),
			description: ((props.achievement) ? props.achievement.description : ""),
			earnable: ((props.achievement)) ? props.achievement.earnable : false,
			limited: ((props.achievement)) ? props.achievement.limited : false,
			secret: ((props.achievement)) ? props.achievement.secret : false,
			edit: false
		};

	}

	shouldComponentUpdate(nextProps, nextState) {

		if(nextProps.achievement) {

			if ((!this.props.achievement && nextProps.achievement) || (this.props.achievement._id !== nextProps.achievement._id)) {
				
				this.setState({
					title: nextProps.achievement.title,
					description:nextProps.achievement.description,
					icon: nextProps.achievement.icon,
					earnable: nextProps.achievement.earnable,
					limited: nextProps.achievement.limited,
					secret: nextProps.achievement.secret,
					edit: true,
					id: nextProps.achievement._id
				});
			}
		}

		return true;
	}

	componentDidUpdate(prevProps, prevState) {
		this.positionModal();
	}

	positionModal = () => {
		let winWidth = window.innerWidth;
		let winHeight = window.innerHeight;

		let scrollTop = document.documentElement.scrollTop;

		this.modal.style.top = (winHeight/2) - (this.modal.offsetHeight / 2) + scrollTop + 'px';
		this.modal.style.left = (winWidth / 2) - (this.modal.offsetWidth / 2) + 'px';

	}

	onMaskClick = () => {
		this.setState({
			title: '',
			description: '',
			earnable: false,
			limited: false,
			secret: false,
			icon: '',
			edit: false
		})
		this.props.onClose();
	}

	handleIconChange = (event) => {
		let touched = this.state.touched || {};
		touched['icon'] = true;

		if(event.target.files[0]) {
			this.setState({
				icon: URL.createObjectURL(event.target.files[0]),
				touched: touched
			});	
		} else {
			this.setState({
				icon: '',
				touched: touched
			});
		}
		
	}

	handleDataChange = (event) => {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		let touched = this.state.touched || {};
		touched[name] = true;

		this.setState({
			[name]: value,
			touched: touched
		});
	}

	handleSubmit = (event) => {
		event.preventDefault();
		console.log(this.state);

		let achievement = {};

		if(this.state.edit) {
			Object.keys(this.state.touched).forEach((key) => {
				if(this.state.touched[key]) {
				    achievement[key] = this.state[key];
				}
			});
		} else {

			let achievement = {
				title: this.state.title,
				description: this.state.description,
				earnable: this.state.earnable,
				limited: this.state.limited,
				secret: this.state.secret,
				icon: this.state.icon
			}
		}

		achievement.edit = this.state.edit;
		achievement.id = this.state.id;

		axios.post('/api/achievement/create', achievement).then((res) => {
			console.log(res.data);
			this.props.onSubmit(res.data.achievement);
		});
	}

	render() {

		let content = null;

		if (this.props.active) {
			console.log(this.state);
			let {title, description, earnable, limited, secret} = this.state;

			content = (
				<div>
					<div className="modal-header">
						<h3>{this.props.title}</h3>
					</div>
					<div className="modal-content">
						<form onSubmit={this.handleSubmit}>
							<div className="formGroup">
								<label htmlFor="achievement-title">Title</label>
								<input
									id="achievement-title"
									name="title"
									className="textInput"
									type="text"
									value={this.state.title}
									onChange={this.handleDataChange}
								/>
							</div>
							<div className="formGroup">
								<label htmlFor="achievement-description">Description</label>
								<input
									id="achievement-description"
									name="description"
									className="textInput"
									type="text"
									value={this.state.description}
									onChange={this.handleDataChange}
								/>
							</div>
							<div className="formGroup checkboxGroup">
								<label htmlFor="achievement-earnable" title="This achievement can currently be earned">Earnable</label>
								<input 
									id="achievement-earnable"
									name="earnable"
									type="checkbox"
									title="This achievement can currently be earned"
									checked={this.state.earnable}
									onChange={this.handleDataChange}
								/>
								<label htmlFor="achievement-earnable" title="This achievement can only be earned for a limited time" >Limited Time</label>
								<input
									id="achievement-limited"
									name="limited"
									type="checkbox"
									title="This achievement can only be earned for a limited time"
									checked={this.state.limited}
									onChange={this.handleDataChange}
								/>
							</div>
							<div className="formGroup checkboxGroup">
								<label htmlFor="achievement-secret" title="This achievement will be a secret in your list until someone earns it!">Secret</label>
								<input
									id="achievement-secret"
									name="secret"
									type="checkbox"
									title="This achievement will be a secret in your list until someone earns it!"
									checked={this.state.secret}
									onChange={this.handleDataChange}
								/>
							</div>
							<div className="formGroup">
								<label htmlFor="achievement-icon">Icon</label>
								<input
			                        type="file"
			                        id="achievement-icon"
			                        accept="image/*"
			                        ref={fileInputEl =>
			                            (this.fileInputEl = fileInputEl)
			                        }
			                        onChange={this.handleIconChange}
			                    />
			                    <img src={this.state.icon} />
		                    </div>
		                    <input type="submit" value="Submit" />
						</form>
					</div>
				</div>		
			);
		}

		return (
			<div className={((!this.props.active) ? "modal--hidden" : "")}>
				<div onClick={this.onMaskClick} className="modal-mask"></div>
				<div className="modal-container">
					<div className="modal" ref={modal => (this.modal = modal)}>
						<a href="javascript:;" onClick={this.onMaskClick}>X</a>
						{content}
					</div>
				</div>
			</div>
		);
	}
}

export default AchievementEditModal;