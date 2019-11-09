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

  extend(targetId1, targetId2) {
    let target = document.getElementById(targetId1);
    let target2 = document.getElementById(targetId2);
    target.classList.toggle("show");
    target2.classList.toggle("show");
  }

  render() {
      return (
      <>
        <div className="banner">
          <div className="nav-container">
              <div className="nav-icon-container">
                <i id="nav-links" className="fas fa-bars" onClick={() => this.extend("nav-links", "nav-links-2")}></i>
                <i id="search" className="fas fa-search" onClick={() => this.extend("search-input", "search-input-2")}></i>
                <i className="fas fa-user"></i>
                <i className="fas fa-indent"></i>
              </div>
              <div className="nav-logo">
                <Link to="/">Art Valley</Link>
              </div>     
          </div>
          <div className="nav-extends">
            <div id="search-input" className="nav-search">
              <input id="search-input-2" type="text" placeholder="Search Art Valley" />
            </div> 
          </div>
        </div>
          <div id="nav-links-2" className="nav-links-container">
            <ApolloConsumer>
              {client => (
                <Query query={IS_LOGGED_IN}>
                  {({ data, loading, error }) => {
                    if (loading) { return <p>loading...</p> }
                    if (error) return `Error! ${error.message}`;
                    if (data.isLoggedIn) {
                      return (
                        <div className="nav-links">
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
                        <div id="nav-links-2" className="nav-links">
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
      </>
    );
  };
}

export default withRouter(Nav);
