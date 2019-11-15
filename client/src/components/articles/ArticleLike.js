import React, { Component } from "react";
import { Query, Mutation } from "react-apollo";
import { merge } from "lodash";
import "./article_show.css";
import { withRouter } from "react-router-dom";

import Queries from "../../graphql/queries";
import Mutations from "../../graphql/mutations";

const { FETCH_ARTICLE } = Queries;
const { ADD_ARTICLE_LIKE, ADD_ARTICLE_UNLIKE } = Mutations;


class ArticleLike extends Component {

	constructor(props) {
		super(props)
		this.state = { 
			userId: localStorage.getItem("currentUserId"),
			articleId: this.props.match.params.articleId,
			message: ""
		}
	}

	update() {
		this.setState({ likeNum: this.props.likers.length });
	}

	updateLikeCache(cache, data) { 
		const article = cache.readQuery({
			query: FETCH_ARTICLE,
			variables: {
				_id: this.props.match.params.articleId
			}
		});
		let newArticle = merge({}, article);

		newArticle.article.likers.push(data.data.addUserLikedArticle)
		cache.writeQuery({
			query: FETCH_ARTICLE, data: newArticle,
			variables: {
				_id: this.props.match.params.articleId
			}
		})
	}

	updateUnlikeCache(cache, data) {
		const article = cache.readQuery({
			query: FETCH_ARTICLE,
			variables: {
				_id: this.props.match.params.articleId
			}
		});

		let newArticle = merge({}, article);
		newArticle.article.likers.pop(data.data.userUnlikeArticle)

		
		cache.writeQuery({
			query: FETCH_ARTICLE, data: newArticle,
			variables: {
				_id: this.props.match.params.articleId
			}
		})
	}


	like(addUserLikedArticle) {
		addUserLikedArticle({
			variables: {
				userId: localStorage.getItem("currentUserId"),
				articleId: this.props.match.params.articleId
			}
		})
	}

	unlike(userUnlikeArticle) {
		userUnlikeArticle({
			variables: {
				userId: localStorage.getItem("currentUserId"),
				articleId: this.props.match.params.articleId
			}
		})
	}
	
	render() {
		if (!this.props.likers) {
			return null
		} else {

		
		const likersIdArr = this.props.likers.map(liker => liker.id)
		if (likersIdArr.includes(this.state.userId)) {
			return (
				<Mutation mutation={ADD_ARTICLE_UNLIKE}
					onError={err => this.setState({ message: err.message })}
					update={(cache, data) => this.updateUnlikeCache(cache, data)}
				>
					{(userUnlikeArticle) => (
						<div className="article-show-likes"
							onClick={(e) => {
								e.preventDefault();
								this.unlike(userUnlikeArticle);
								this.update();
							}}
						>
							Unlike {this.props.likers.length}
						</div>
					)}
				</Mutation>
			)
		} else {
			return (
				<Mutation
					mutation={ADD_ARTICLE_LIKE}
					update={(cache, data) => this.updateLikeCache(cache, data)}
					onError={err => this.setState({ message: err.message })}
				>
					{ addUserLikedArticle => (
						<div className="article-show-likes"
							onClick={() => this.like(addUserLikedArticle)} >
							Like {this.props.likers.length}
						</div>
					)}
				</Mutation>
			)
		}	
	
		}}
}

export default withRouter(ArticleLike);


