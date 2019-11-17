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

          console.log(data);
          // let settings;
          // if (
          //   this.props.match.params.userId ===
          //   localStorage.getItem("currentUserId")
          // ) {
          //   settings = (
          //     // <div className="settings-link">
          //     //   {/* <Link
  
          //     //     to={`/settings/${localStorage.currentUserId}`}
          //     //   >
          //     //     +
          //     //   </Link> */}

          //     //   {/* <Link
          //     //     to={{
          //     //       pathname: `/settings/${localStorage.currentUserId}`,
          //     //       state: { data }
          //     //     }}
          //     //   >
          //     //     +
          //     //   </Link> */}
               
          //     // </div>
              
          //   );
          // }

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
                  {/* {art.title} */}
                  <img
                    className="profile-photo-thumbnail"
                    src={art.photoLink}
                  />
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
              <li key={article.id}>
                <img className="profile-photo-thumbnail" src={article.photoLink} />
              </li>
            );
          });

          return (
            <div className="profile-container">
              <div className="user-info">
                <h1 className="user-header">{data.user.name}</h1>
                {/* {settings} */}
              </div>

              {/* <button className="settings-button" onClick={this.handleClick}>
                Edit
              </button>
              {this.state.clicked ? <Settings user={data} clicked={true}/> : null}
              {this.state.clicked ?  null : <Settings user={data} clicked={false}/>} */}
              {settings}
              {recentlyLiked}

              {/* <div className="profile-playlist">
                <h1 className="profile-header">Playlist</h1> */}
              {/* <ul className="liked-list">
                  {artList}
                </ul>
              <div className="see-more-button">
                  <Link to="#">See More</Link>
              </div> */}
              {/* </div> */}
              <div className="profile-published">
                <h1 className="profile-header">Recently Published Art</h1>
                <ul className="published-list">{artPubList}</ul>
              </div>
              <div className="profile-published">
                <h1 className="profile-header">Recently Published Articles</h1>
                <ul className="published-list">{articlePubList}</ul>
              </div>
              <h1>TEST BELOW</h1>
              <CreateComment className="comment"></CreateComment>
            </div>
          );
        }}
      </Query>
    );
  }
}
 
export default Profile;