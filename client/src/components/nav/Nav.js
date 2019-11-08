import React from "react";
import { Query, ApolloConsumer } from "react-apollo";
import Queries from "../../graphql/queries";
import { Link, withRouter } from "react-router-dom";
import "./nav.css";

const { IS_LOGGED_IN } = Queries;

class Nav extends React.Component {
  constructor(props){
    super(props);
    this.extend = this.extend.bind(this);
  }

  extend(clickable, targetId) {
    let target = document.getElementById(targetId);
    target.classList.toggle("show");
  }

  render() {
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
                                this.props.history.push("/");
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
              <i className="fas fa-bars"></i>
              <i id="search" className="fas fa-search" onClick={() => this.extend("search", "search-input")}></i>
              <i className="fas fa-user"></i>
              <i className="fas fa-indent"></i>
            </div>
            <div className="nav-logo">
              ArtValley
            </div>
            
        </div>
        <div className="nav-extends">
          <div id="search-input" className="nav-search">
            <input type="text" placeholder="Search Art Valley" />
          </div>
        </div>
      </div>
    );
  };
}

export default withRouter(Nav);
