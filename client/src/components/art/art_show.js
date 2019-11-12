import React, { Component } from "react";
import { Query } from "react-apollo";
import { withRouter } from "react-router-dom";
import "./art_show.scss";
import CreateComment from "../comments/CreateComment";

import Queries from "../../graphql/queries";
const { FETCH_ART } = Queries;

class ArtShow extends Component {

	constructor(props) {
		super(props)
	}

	render() {
		return (
			<Query
				query={FETCH_ART}
				variables={{ artId: this.props.match.params.artId }} >
				{({ loading, error, data }) => {
					if (loading) return (
						<div>
							<p>Loading...</p>
						</div>
					);
					if (error) return (
						<div>
							<p>Error</p>
						</div>
					);

					console.dir(data)
					const { description, photoLink, title, likers, author, comments } = data.artById;

					let showArtist;
					if (author && author.publishedArts ) {
						let artPublishedLimit = author.publishedArts.slice(0, 6);
						let artPubList = artPublishedLimit.map(artPub => {
							return (
								<li className="published-li" key={artPub.id}>
									<img className="published-photo-thumbnail" src={artPub.photoLink} />
								</li>
							);
						});
						showArtist = (
              <div className="show-artist">
                <h1 className="published-header">Art of the Author</h1>
                <ul className="published-ul">{artPubList}</ul>
              </div>
            );
					} else {
						showArtist = ( null )
					}
					
					// let commentList;
					// if (comments && comments.length !== 0) {
					// 	commentList = comments.map(comment => {
					// 		return (
					// 			<li className="comment-li" key={comment.id}>
					// 				{comment.body}
					// 			</li>
					// 		)
					// 	})
					// } else {
					// 	return null;
					// }

					return (
            <div className="show-container">
              <div className="show-art">
                <div className="show-pic">
                  <img className="show-image" src={photoLink}></img>
                </div>

                <div className="show-info">
                  <div className="info-main">
                    <div className="info-1">
                      <div className="show-title">{title}</div>
                      <div className="show-description">{description}</div>
                    </div>

                    <div className="info-2">
                      <div className="show-likes">Likes {likers.length}</div>
                    </div>
                  </div>

                  <div className="info-3">
                    <div className="show-comment">
											
										</div>
                  </div>
                </div>

								{showArtist}

              </div>
            </div>
          );
				}}
			</Query>
		
		)
	}
}

export default withRouter(ArtShow);