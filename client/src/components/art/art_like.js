import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { merge } from "lodash";
import "./art_show.scss";
import { withRouter } from "react-router-dom";

import Queries from "../../graphql/queries";
import Mutations from "../../graphql/mutations";

const { FETCH_ART } = Queries;
const { USER_LIKE_ART, USER_UNLIKE_ART } = Mutations;


class ArtLike extends Component {

	constructor(props) {
		super(props)
		this.state = { 
			userId: localStorage.getItem("currentUserId"),
			artId: this.props.match.params.artId,
			message: "",
			loading: false,
			loggedIn: true,
			numOfLikes: this.props.likers.length
		}
	}

	updateNum() {
		this.setState({ numOfLikes: this.props.likers.length });
	}

	updateLikeCache(cache, data) { 
		const artWork = cache.readQuery({
			query: FETCH_ART,
			variables: {
				artId: this.props.match.params.artId
			}
		});

		let newArtWork = merge({}, artWork);
		newArtWork.artById.likers.push(data.data.addUserLikedArt)

		cache.writeQuery({
			query: FETCH_ART, data: newArtWork,
			variables: {
				artId: this.props.match.params.artId
			}
		})
	}

	updateUnlikeCache(cache, data) {
		const artWork = cache.readQuery({
			query: FETCH_ART,
			variables: {
				artId: this.props.match.params.artId
			}
		});

		let newArtWork = merge({}, artWork);
		newArtWork.artById.likers.pop(data.data.userUnlikeArt)

		cache.writeQuery({
			query: FETCH_ART, data: newArtWork,
			variables: {
				artId: this.props.match.params.artId
			}
		})
	}


	like(addUserLikedArt) {

		// this.setState({loading: true});
		addUserLikedArt({
			variables: {
				userId: localStorage.getItem("currentUserId"),
				artId: this.props.match.params.artId
			}
		}) //.then(this.setState({loading: false}));
	}

	unlike(userUnlikeArt) {
		// this.setState({ loading: true });
		userUnlikeArt({
			variables: {
				userId: localStorage.getItem("currentUserId"),
				artId: this.props.match.params.artId
			}
		}) //.then(this.setState({ loading: false }));
	}
	
	render() {

		if (!this.state.userId) {
			return (
				<div className="show-likes-loggedout" id="liking">
					Likes {this.state.numOfLikes }
				</div>
			)
		}
		const likersIdArr = this.props.likers.map(liker => liker.id)
		if (likersIdArr.includes(this.state.userId)) {
			return (
				<Mutation mutation={USER_UNLIKE_ART}
					onError={err => this.setState({ message: err.message })}
					update={(cache, data) => this.updateUnlikeCache(cache, data)}
				>
					{(userUnlikeArt) => (
						<div className="show-likes-minus" id="liking"
							onClick={(e) => {
								e.preventDefault();
								if (!this.state.loading) {

									let liking = document.getElementById("liking");
									liking.disabled = true;
									this.setState({ loading: true });
									
									this.unlike(userUnlikeArt).then(() => {
										this.updateNum() // this.setState({ numOfLikes: this.props.likers.length });
										liking.disabled = false;
										this.setState({ loading: false });
									})
								}
							}} >
							Unlike {this.state.numOfLikes}
						</div>
					)}
				</Mutation>
			)
		} else {
			return (
				<Mutation
					mutation={USER_LIKE_ART}
					update={(cache, data) => this.updateLikeCache(cache, data)}
					onError={err => this.setState({ message: err.message })}
				>
					{ addUserLikedArt => (
						<div className="show-likes-plus" id="liking"
							onClick={(e) => {
								e.preventDefault();
								if (!this.state.loading) {

									let liking = document.getElementById("liking");
									liking.disabled = true;
									this.setState({ loading: true });

									this.like(addUserLikedArt).then(() => {
										this.updateNum() // this.setState({ numOfLikes: this.props.likers.length });
										liking.disabled = false;
										this.setState({ loading: false });
									})
								}
							}} >
							Like { this.state.numOfLikes }
						</div>
					)}
				</Mutation>
			)
		}	
	}
}

export default withRouter(ArtLike);


