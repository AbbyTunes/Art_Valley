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
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error</p>;

          let artList = data.user.likedArts.map(art => {
            return <li key={art.id}>
                {art.title}
              </li>;
          })
          return (
            <div className="profile-container">
              <div className="user-info">
                <h1 className="user-header">{data.user.name}</h1>
                <div className="settings-link">
                  {/* <Link to="/settings">Settings</Link> */}
                  <Link to="#">+</Link>
                </div>
              </div>
              <div className="recently-liked">
                <h1 className="profile-header">Recently Liked</h1>
                {artList}
                <Link to="#">See More</Link>
              </div>
            </div>
          );
        }}
      </Query>
    );
}
 
export default Profile;