import React, { Component } from "react";
import { Query } from "react-apollo";
import "./art_show.scss";
import { withRouter } from "react-router-dom";
import Queries from "../../graphql/queries";
import CreateComment from "../comments/CreateComment";
const { FETCH_ART } = Queries;

class ArtShow extends Component {

	render() {
		return (
			<Query
				query={FETCH_ART}
				variables={{ artId: this.props.match.params.artId }} >
				{({ loading, error, data }) => {
					if (loading) return (
                         <div className="temp">
                           <p>Loading...</p>
                         </div>
                       );
					if (error) return (
                       <div className="temp">
                         <p>Error</p>
                       </div>
                     );

					const { id, description, photoLink, title, likers, author } = data.artById;
					console.log(localStorage)
					console.dir(data)
					
					let showArtist;
					if (author && author.publishedArts 
						// && author.publishedArts.length !==1 
						) {
						let artPublishedLimit = author.publishedArts.filter(pubArt => pubArt.id !== id).slice(0, 6);
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
						showArtist = (null)
					}

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
										<div className="show-comment">Comments</div>
                  </div>

									<CreateComment artId={data.artById.id} comments={data.artById.comments} />

                </div>

								{showArtist}

                <div className="show-category"></div>
              </div>
            </div>
          );
				}}
			</Query>
		
		)
	}
}

export default withRouter(ArtShow);