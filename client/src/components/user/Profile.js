import React from "react";
import { Query } from "react-apollo";
import "./profile.css"
import { Link } from "react-router-dom";
//test//
import CreateComment from "../comments/CreateComment";
import Settings from "./Settings";
//
import Queries from "../../graphql/queries";
const { FETCH_USER } = Queries;

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false
    }

    this.debugEdit = this.debugEdit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  debugEdit(userData) {
    return (
      <div>
        <Settings user={userData} />
      </div>
    );
  }

  handleClick() {
    if (this.state.clicked) {
      this.setState({
        clicked: false
      });
    } else {
      this.setState({
        clicked: true
      });
    }
    console.log(this.state.clicked)
  }

  render() {
    return (
      <Query
        query={FETCH_USER}
        variables={{ _id: this.props.match.params.userId }}
      >
        {({ loading, error, data }) => {
          if (loading)
            return (
              <div className="profile-container">
                <p>Loading...</p>
              </div>
            );
          if (error)
            return (
              <div className="profile-container">
                <p>Error</p>
              </div>
            );

          let settings;
          if (localStorage.currentUserId === data.user.id) {
            settings = (
              <div>
                <button className="settings-button" onClick={this.handleClick}>
                  Edit
                </button>
                {this.state.clicked ? <Settings user={data} clicked={true}/> : null}
                {this.state.clicked ?  null : <Settings user={data} clicked={false}/>}
              </div>
            )
          } else {
            settings = (
              <div>
                <Settings user={data} clicked={false} />
              </div>
            )
          }

          

          let recentlyLiked;
          if (data.user.likedArts.length !== 0) {
            let artListLimit = data.user.likedArts.slice(0, 6);
            // let artList = artListLimit.map(art => {
            let artList = data.user.likedArts.map(art => {
              return (
                <li key={art.id}>
                  <Link to={`/arts/${art.id}`}>
                  <img
                    className="profile-photo-thumbnail"
                    src={art.photoLink}
                    />
                  </Link>
                </li>
              );
            });
            recentlyLiked = (
              <div className="recently-liked">
                <h1 className="profile-header">Recently Liked</h1>
                <ul className="liked-list">{artList}</ul>
                <div className="see-more-button">
                  <Link to="#">See More</Link>
                </div>
              </div>
            );
          }

          let artPublishedLimit = data.user.publishedArts.slice(0, 6);
          let artPubList = artPublishedLimit.map(art => {
            return (
              <li key={art.id}>
                <img className="profile-photo-thumbnail" src={art.photoLink} />
              </li>
            );
          });

          let articlePublishedLimit = data.user.publishedArticles.slice(0, 6);
          let articlePubList = articlePublishedLimit.map(article => {
            return (
              <Link to={`/community/${article.id}`}>
                <li key={article.id}>
                  <img className="profile-photo-thumbnail" src={article.photoLink} />
                </li>
              </Link>
            );
          });

          let pubArt;
            pubArt = data.user.publishedArt ? 
              <div className="profile-published">
                <h1 className="profile-header">Recently Published Art</h1>
                <ul className="published-list">{artPubList}</ul>
              </div> :
              // <div className="profile-published">
              //   <h1 className="profile-header">Recently Published Art</h1>
              //     <Link to="/create" className="profile-art-create-link">
              //       Publish Work
							//     </Link>
              //   </div>
              <div></div>

          let pubArticleSection;
            pubArticleSection = data.user.publishedArticles ?
            <div className="profile-published">
              <h1 className="profile-header">Recently Published Articles</h1>
              <ul className="published-list">{articlePubList}</ul>
            </div> : <div></div>


          return (
            <div className="profile-container">
              <div className="user-info">
                <h1 className="user-header">{data.user.name}</h1>
              </div>
              {settings}
              {recentlyLiked}
              {pubArt}
              {pubArticleSection}
            </div>
          );
        }}
      </Query>
    );
  }
}
 
export default Profile; 