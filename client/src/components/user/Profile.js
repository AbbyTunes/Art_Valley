import React from "react";
import { Query } from "react-apollo";
import "./profile.css"
import Queries from "../../graphql/queries";
const { FETCH_USER } = Queries;

const Profile = (props) => {
    return (
      <Query query={FETCH_USER} variables={{ _id: props.match.params.userId }}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error</p>;
          
          let artList = data.user.likedArts.map(art => {
            return <li>
                {art.title}
              </li>;
          })
          return (
            <div className="temp">
              <p>{data.user.name}</p>
              <p>{data.user.email}</p>  
              <div>
                {artList}
              </div>
            </div>
          );
        }}
      </Query>
    );
}
 
export default Profile;