import React from "react";
import { Query } from "react-apollo";
import "./profile.css"
import Queries from "../../graphql/queries";
const { FETCH_USER } = Queries;

const Profile = (props) => {
  debugger;
    return (
      <Query query={FETCH_USER} variables={{ _id: props.match.params.userId }}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error</p>;

          return (
            <div className="temp">
              <p>{data.user.name}</p>
              <p>{data.user.email}</p>
            </div>
          );
        }}
      </Query>
    );
}
 
export default Profile;