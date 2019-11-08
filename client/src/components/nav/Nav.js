import React from "react";
import { Query, ApolloConsumer } from "react-apollo";
import Queries from "../../graphql/queries";
import { Link, withRouter } from "react-router-dom";
import "./nav.css";

const { IS_LOGGED_IN } = Queries;

const Nav = props => {
  return (
    <div className="banner">
      <div className="nav-container">
          <div className="nav-links">
            <ApolloConsumer>
              {client => (
                <Query query={IS_LOGGED_IN}>
                  {({ data, loading, error }) => {
                    if (loading) { return <p>loading...</p> }
                    if (error) return `Error! ${error.message}`;
                    if (data.isLoggedIn) {
                      return (
                        <div>
                          <button
                            onClick={e => {
                              e.preventDefault();
                              localStorage.removeItem("auth-token");
                              client.writeData({ data: { isLoggedIn: false } });
                              props.history.push("/");
                            }} >
                            Logout
                          </button>
                          <Link to="/">Home</Link>
                        </div>
                      );
                    } else {
                      return (
                        <div>
                          <Link to="/">Home</Link>
                          <Link to="/login">Login</Link>
                          <Link to="/register">Register</Link>
                        </div>
                      );
                    }
                  }}
                </Query>
              )}
            </ApolloConsumer>
          </div>
          <div className="nav-icon-container">
            <i class="fas fa-bars"></i>
            <i className="fas fa-search"></i>
            <i class="fas fa-indent"></i>
          </div>
          <div className="nav-logo">
            ArtValley
          </div>
      </div>
    </div>
  );
};

export default withRouter(Nav);
