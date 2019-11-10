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

          let artListLimit = data.user.likedArts.slice(0, 5);
          let artList = artListLimit.map(art => {
            return <li key={art.id}>
                {/* {art.title} */}
                <img className="profile-photo-thumbnail" src={art.photoLink}/>
              </li>;
          })
          return (
            <div className="profile-container">
              <div className="user-info">
                <h1 className="user-header">{data.user.name}</h1>
                <div className="settings-link">
                  <Link to="/settings">+</Link>
                </div>
              </div>
              <div className="recently-liked">
                <h1 className="profile-header">Recently Liked</h1>
                <ul className="liked-list">
                  {artList}
                </ul>
                <div className="see-more-button">
                  <Link to="#">See More</Link>
                </div>
              </div>
              <div className="profile-playlist">
                <h1 className="profile-header">Playlist</h1>
                {/* <ul className="liked-list">
                  {artList}
                </ul> */}
                {/* <div className="see-more-button">
                  <Link to="#">See More</Link> */}
                {/* </div> */}
              </div>
              <div className="profile-playlist">
                <h1 className="profile-header">Recently Published</h1>
                {/* <ul className="liked-list">
                  {artList}
                </ul> */}
                {/* <div className="see-more-button">
                  <Link to="#">See More</Link> */}
                {/* </div> */}
              </div>
            </div>
          );
        }}
      </Query>
    );
}
 
export default Profile;