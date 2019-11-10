import React from "react";
import { Query } from "react-apollo";
import "./profile.css"
import { Link } from "react-router-dom";
import Queries from "../../graphql/queries";
const { FETCH_USER } = Queries;


const Profile = (props) => {
    return (
      <Query query={FETCH_USER} variables={{ _id: props.match.params.userId }}>
        {({ loading, error, data }) => {
          if (loading) return (
            <div className="profile-container">
              <p>Loading...</p>
            </div>
            );
          if (error) return (
            <div className="profile-container">
              <p>Error</p>
            </div>
          );

          let settings;
          if (props.match.params.userId === localStorage.getItem("currentUserId")){
            settings =
              <div className="settings-link">
                <Link to="/settings">+</Link>
              </div>
          }


          let recentlyLiked;
          if (data.user.likedArts.length !== 0) {
            let artListLimit = data.user.likedArts.slice(0, 6);
            // let artList = artListLimit.map(art => {
            let artList = data.user.likedArts.map(art => {
              return <li key={art.id}>
                  {/* {art.title} */}
                  <img className="profile-photo-thumbnail" src={art.photoLink}/>
                </li>;
            })
            recentlyLiked = 
              < div className = "recently-liked" >
                <h1 className="profile-header">Recently Liked</h1>
                <ul className="liked-list">
                  {artList}
                </ul>
                <div className="see-more-button">
                  <Link to="#">See More</Link>
                </div>
              </div>;
          }

          

          let artPublishedLimit = data.user.publishedArts.slice(0, 6);
          let artPubList = artPublishedLimit.map(art => {
            return <li key={art.id}>
              <img className="profile-photo-thumbnail" src={art.photoLink} />
            </li>;
          })

          return (
            <div className="profile-container">
              <div className="user-info">
                <h1 className="user-header">{data.user.name}</h1>
                {settings}
              </div>
              {recentlyLiked}
              {/* <div className="profile-playlist">
                <h1 className="profile-header">Playlist</h1> */}
                {/* <ul className="liked-list">
                  {artList}
                </ul> */}
                {/* <div className="see-more-button">
                  <Link to="#">See More</Link> */}
                {/* </div> */}
              {/* </div> */}
              <div className="profile-published">
                <h1 className="profile-header">Recently Published</h1>
                <ul className="published-list">
                  {artPubList}
                </ul>
              </div>
            </div>
          );
        }}
      </Query>
    );
}
 
export default Profile;