import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { Mutation } from "react-apollo";
import mutations from "../../graphql/mutations";
import './session.css';
const { LOGIN_USER } = mutations;

class Login extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      email: "",
      password: "",
      message: ""
    };
    
		this.updateCache = this.updateCache.bind(this);
  }

  updateCache(client, { data }) {
    // console.log(data);
    // here we can write directly to our cache with our returned mutation data
    client.writeData({
			data: {
				isLoggedIn: data.login.loggedIn
			}
    });
  }

  update(field) {
    // console.log(this.state)
    return e => this.setState({ [field]: e.target.value });
  }

  render() {
    return (
      <Mutation
        mutation={LOGIN_USER}
        onError={err => this.setState({ message: err.message })}
        onCompleted={data => {
          const { token } = data.login;
					localStorage.setItem("auth-token", token);
          localStorage.setItem("currentUserId", data.login.id);
          localStorage.setItem("currentUsername", data.login.name);
          this.props.history.push("/");
        }}
        update={(client, data) => this.updateCache(client, data)}
      >
        {loginUser => (
          <div className="session-form">
            <h1 className="session-header">Log In</h1>
            <form
              onSubmit={e => {
                e.preventDefault();
                loginUser({
                  variables: {
                    email: this.state.email,
                    password: this.state.password
                  }
                });
              }}
            >
              <span className="session-errors">
                {this.state.message}
              </span>
              
              <h3 className="session-input-title">Email Address</h3>
              <input
                className="session-input-box"
                value={this.state.email}
                onChange={this.update("email")}
                required
                type="text"
              />
              <h3 className="session-input-title">Password</h3>
              <input
                className="session-input-box"
                value={this.state.password}
                onChange={this.update("password")}
                required
                type="password"
              />
              
            
              <div
                className="session-guest-link"
                onClick={e => {
                  e.preventDefault();
                  loginUser({
                    variables: {
                      email: "GuestUser@guest.com",
                      password: "hunter2"
                    }});
                }}>
                  Guest Demo
              </div>

              <div className="session-spacer" />
              <button
                className="session-button" 
                type="submit">
                  Log In
              </button>
              
            </form>
          </div>
        )}
      </Mutation>
    );
  }
}

export default withRouter(Login);
