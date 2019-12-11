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
			loggedIn: true
		}
	}

	update() {
		this.setState({ likeNum: this.props.likers.length });
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

		this.setState({loading: true});
		addUserLikedArt({
			variables: {
				userId: localStorage.getItem("currentUserId"),
				artId: this.props.match.params.artId
			}
		}).then(this.setState({loading: false}));
	}

	unlike(userUnlikeArt) {
		this.setState({ loading: true });
		userUnlikeArt({
			variables: {
				userId: localStorage.getItem("currentUserId"),
				artId: this.props.match.params.artId
			}
		}).then(this.setState({ loading: false }));
	}
	
	render() {

		if (!this.state.userId) {
			return (
				<div className="show-likes-loggedout">
					Likes {this.props.likers.length}
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
						<div className="show-likes-minus"
							onClick={(e) => {
								e.preventDefault();
								if (!this.state.loading) {
									this.unlike(userUnlikeArt);
									this.update();
								}
							}} >
							Unlike {this.props.likers.length}
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
						<div className="show-likes-plus"
							onClick={(e) => {
								e.preventDefault();
								if (!this.state.loading) {
									this.like(addUserLikedArt)
								}
							}} >
							Like {this.props.likers.length}
						</div>
					)}
				</Mutation>
			)
		}	
	}
}

export default withRouter(ArtLike);


