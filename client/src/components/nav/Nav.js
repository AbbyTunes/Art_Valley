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
    this.state = { elements: ""};
  }

  extend(targetId1, targetId2) {
    this.closeModal(this.state.elements);
    let target = document.getElementById(targetId1);
    let target2 = document.getElementById(targetId2);
    let modal = document.getElementById("modal");
    // let icon = document.getElementById(clickable);
    this.setState({elements: [target, target2]}); 
    // this.setState({icon: icon});
    target.classList.add("show");
    target2.classList.add("show");
    // icon.classList.add("show");
    modal.classList.add("active");
  }

  closeModal(elements) {
    if (this.state.elements){
      elements.forEach(ele => {
        ele.classList.remove("show");
      })
    }
    // if (this.state.icon){
    //   icon.classList.remove("show");
    //   this.setState({icon: ""});
    // }
    let modal = document.getElementById("modal");
    modal.classList.remove("active");
  }

  render() {
      return (
        <>
          <div className="banner">
            <div
              id="modal"
              className="nav-modal"
              onClick={() => this.closeModal(this.state.elements)}
            ></div>
            <div className="nav-container">
              <div className="nav-icon-container">
                <i
                  id="links"
                  className="fas fa-bars"
                  onClick={() => this.extend("nav-links", "nav-links-2")}
                ></i>
                <i
                  id="search"
                  className="fas fa-search"
                  onClick={() => this.extend("search-input", "search-input-2")}
                ></i>
                <Link className="user-link" to={`/users/${localStorage.getItem("currentUserId")}`}><i className="fas fa-user"></i></Link>
                <i className="fas fa-indent"></i>
              </div>
              <div className="nav-logo">
                <Link to="/">Art Valley</Link>
              </div>
            </div>

            <div className="nav-extends">
              <div id="search-input" className="nav-search">
                <input
                  id="search-input-2"
                  type="text"
                  placeholder="Search Art Valley"
                />
              </div>
            </div>
          </div>
          <div id="nav-links" className="nav-links-container">
            <ApolloConsumer>
              {client => (
                <Query query={IS_LOGGED_IN}>
                  {({ data, loading, error }) => {
                    if (loading) {
                      return <p>loading...</p>;
                    }
                    if (error) return `Error! ${error.message}`;
                    if (data.isLoggedIn) {
                      return (
                        <div id="nav-links-2" className="nav-links">
                          <Link to="/"
                            onClick={e => {
                              e.preventDefault();
                              localStorage.removeItem("auth-token");
                              client.writeData({ data: { isLoggedIn: false } });
                              this.props.history.push("/");
                              this.closeModal(this.state.elements);
                            }}
                          >
                            Logout
                          </Link>
                          <Link to="/" onClick={() => this.closeModal(this.state.elements)}>Home</Link>
                          <Link 
                            to={`/users/${localStorage.getItem("currentUserId")}`} 
                            onClick={() => this.closeModal(this.state.elements)}
                          >
                            Profile
                          </Link>
                        </div>
                      );
                    } else {
                      return (
                        <div id="nav-links-2" className="nav-links">
                          <Link
                            onClick={() => this.closeModal(this.state.elements)}
                            to="/"
                          >
                            Home
                          </Link>
                          <Link
                            onClick={() => this.closeModal(this.state.elements)}
                            to="/login"
                          >
                            Login
                          </Link>
                          <Link
                            onClick={() => this.closeModal(this.state.elements)}
                            to="/register"
                          >
                            Register
                          </Link>
                        </div>
                      );
                    }
                  }}
                </Query>
              )}
            </ApolloConsumer>
          </div>
          <div className="nav-categories-container">
            <ul className="nav-categories-list">
              <li><Link to="/arts">Photos</Link></li>
              <li><Link to="/community">Community</Link></li>
              <li><Link to="/videos">Videos</Link></li>
            </ul>
          </div>
        </>
      );
  };
}

export default withRouter(Nav);
