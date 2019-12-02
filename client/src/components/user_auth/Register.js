import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { withRouter} from "react-router-dom";
import mutations from "../../graphql/mutations";
import './session.css';
const { REGISTER_USER, LOGIN_USER } = mutations;

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      message: ""
		};
    this.updateCache = this.updateCache.bind(this);
    this.updateLoginCache = this.updateLoginCache.bind(this);

  }

  updateCache(client, { data }) {
    // console.log(data);
    client.writeData({
      data: { isLoggedIn: data.register.loggedIn }
    });
  }

  updateLoginCache(client, { data}) {
    client.writeData({
      data: { isLoggedIn: data.login.loggedIn }
    })
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  
  
  render() {
    const guestLogin = (
        <Mutation
          mutation={LOGIN_USER}
          onCompleted={data => {
            const { token } = data.login;
            localStorage.setItem("auth-token", token);
            localStorage.setItem("currentUserId", data.login.id);
            localStorage.setItem("currentUsername", data.login.name);
            this.props.history.push("/");
          }}
          update={(client, data) => this.updateLoginCache(client, data)}
        >
          {loginUser => (
            <div
              className="session-guest-link"
              onClick={e => {
                e.preventDefault();
                loginUser({
                  variables: {
                    email: "GuestUser@guest.com",
                    password: "hunter2"
                  }
                });
              }}>
              Guest Demo
          </div>
          )}
        </Mutation>
    )

    return (
      <Mutation
        mutation={REGISTER_USER}
        onError={err => this.setState({ message: err.message })}
        onCompleted={data => {
          const { token } = data.register;
          localStorage.setItem("auth-token", token);
          localStorage.setItem("currentUserId", data.register.id);
          localStorage.setItem("currentUsername", data.register.name);
          
          this.props.history.push("/");
        }}
        update={(client, data) => this.updateCache(client, data)}
      >
        {registerUser => (
          <div className="session-form">
            <h1 className="session-header">Register</h1>

            <span className="session-errors">
              {this.state.message}
            </span>
            <form
              onSubmit={e => {
                e.preventDefault();
                registerUser({
                  variables: {
                    name: this.state.name,
                    email: this.state.email,
                    password: this.state.password
                  }
                });
              }}
            >
              <h3 className="session-input-title">Username</h3>
              <input
                type="text"
                className="session-input-box"
                value={this.state.name}
                onChange={this.update("name")}
                required
                
              />
              <h3 className="session-input-title">Email Address</h3>
              <input
                type="text"
                className="session-input-box"
                value={this.state.email}
                onChange={this.update("email")}
                required
                
              />
              <h3 className="session-input-title">Password</h3>
              <input
                className="session-input-box"
                value={this.state.password}
                onChange={this.update("password")}
                required
                type="password"
              />
              {/* login is the placeholder path */}
              {guestLogin}
              <div className="session-spacer" />
              <button
                className="session-button"
                type="submit">
                Register
              </button>
            </form>
          </div>
        )}
      </Mutation>
    );
  }
}

export default withRouter(Register);
