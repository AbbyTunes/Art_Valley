import React, { Component } from "react";
import { Mutation } from "react-apollo";
import "./art_show.scss";
import { withRouter } from "react-router-dom";
import Mutations from "../../graphql/mutations";
const { USER_LIKE_ART, USER_UNLIKE_ART } = Mutations;

class ArtLike extends Component {

	constructor(props) {
		super(props)
		this.state = { 
			likeNum: this.props.likers.length,
			userId: localStorage.getItem("currentUserId"),
			artId: this.props.match.params.artId,
			message: ""
		}
	}

	update() {
		this.setState({ likeNum: this.props.likers.length });
	}

	// updateCache(cache, { data }) {
	// 	let art;
	// 	try {
	// 		art = cache.readQuery({ query: FETCH_ART });
	// 	} catch (err) {
	// 		return;
	// 	}
	// 	if (art) {
	// 		let likeArray = art.likers;
	// 		debugger
	// 		// let newLike = data.newProduct;
	// 		cache.writeQuery({
	// 			query: FETCH_PRODUCTS,
	// 			data: { likes: likeArray.concat(newLike) }
	// 		});
	// 	}
	// }

	like(addUserLikedArt) {
		addUserLikedArt({
			variables: {
				userId: localStorage.getItem("currentUserId"),
				artId: this.props.match.params.artId
			}
		})
	}

	unlike(userUnlikeArt) {
		userUnlikeArt({
			variables: {
				userId: localStorage.getItem("currentUserId"),
				artId: this.props.match.params.artId
			}
		})
	}
	
	render() {

		const likersIdArr = this.props.likers.map(liker => liker.id)
		if (likersIdArr.includes(this.state.userId)) {
			return (
				<Mutation mutation={USER_UNLIKE_ART}
					onError={err => this.setState({ message: err.message })}
					// update={(cache, data) => this.updateCache(cache, data)}
				>
					{(userUnlikeArt) => (
						<div className="show-likes"
							onClick={(e) => {
								e.preventDefault();
								this.unlike(userUnlikeArt);
								this.update();
							}}
						>
							Unlike {this.state.likeNum}
						</div>
					)}
				</Mutation>
			)
		} else {
			return (
				<Mutation
					mutation={USER_LIKE_ART}
					// update={(cache, data) => this.updateCache(cache, data)}
					onError={err => this.setState({ message: err.message })}
				>
					{ addUserLikedArt => (
						<div className="show-likes"
							onClick={() => this.like(addUserLikedArt)} >
							Like {this.state.likeNum}
						</div>
					)}
				</Mutation>
			)
		}	
	}
}

export default withRouter(ArtLike);


