import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
import "./video_form.css";
import Mutations from "../../graphql/mutations";
import Queries from "../../graphql/queries";
import TextareaAutosize from "react-textarea-autosize";
const { CREATE_VIDEO } = Mutations;
const { FETCH_ART, FETCH_USER, FETCH_CATEGORIES } = Queries;

class CreateVideo extends Component {
	constructor(props) {
		super(props);

		this.state = {
			category: "5dcc556324cdd659e23e1e5a",
			author: localStorage.currentUserId,
			title: "",
			description: "",
			videoLink: "",
			message: ""
		};
	}

	update(field) {
		return e => this.setState({ [field]: e.target.value });
	}

	addArt(newVideo) {
		newVideo({
			variables: {
				category: "5dcc556324cdd659e23e1e5a",
				author: localStorage.currentUserId,
				title: this.state.title,
				description: this.state.description,
				videoLink: this.state.videoLink,
				message: this.state.message
			}
		})
	}

	
	render() {
		if (!localStorage.length) {
			return <div className="profile-container">Please Log in!</div>
		} else {

			return (
				<Mutation mutation={CREATE_VIDEO}
					onError={err => this.setState({ message: err.message })}
					update={(cache, data) => this.updateCache(cache, data)}
				>
					{(newVideo) => (
						<div className="profile-container">
							<div className="art-form-container">
								<form onSubmit={() => this.addArt(newVideo)}>

									<div className="art-form-content">
										<input
											className="art-form-field-title"
											onChange={this.update("title")}
											value={this.state.title}
											placeholder="Add your title"
											maxLength="40"
											required
										/>
										<div className="art-form-field-name">
											<div className="art-form-field-user-icon">
												<span
													role="img"
													alt=""
													aria-label="debug"
													className="art-form-field-user-icon-pic"
												>
													👤
												</span>
											</div>
											<span className="art-form-field-user-icon-text">
												{localStorage.currentUsername}
											</span>
										</div>
									</div>
									<TextareaAutosize
										className="art-form-field-description"
										value={this.state.description}
										onChange={this.update("description")}
										data-text="Tell everybody what your art is"
										type="text"
										spellCheck="false"
										placeholder="Tell everybody what your art is"
									/>

									<input
										className="art-form-field-link"
										onChange={this.update("videoLink")}
										value={this.state.videoLink}
										placeholder="Place URL for image/video here"
										type="text"
									/>

									<button className="art-form-field-submit" type="submit">
										Create Video
									</button>
								</form>
								<div >
									{this.state.message}
								</div>

							</div>
						</div>
					)}
				</Mutation>
			)
		} 
	}
}

export default CreateVideo;