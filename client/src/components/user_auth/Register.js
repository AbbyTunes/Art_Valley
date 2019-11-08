import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { withRouter, Link } from "react-router-dom";
import mutations from "../../graphql/mutations";
import './session.css';
const { REGISTER_USER } = mutations;

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: ""
		};
		this.updateCache = this.updateCache.bind(this);
  }

  updateCache(client, { data }) {
    // console.log(data);
    client.writeData({
      data: { isLoggedIn: data.register.loggedIn }
    });
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  render() {
    return (
      <Mutation
        mutation={REGISTER_USER}
        onCompleted={data => {
          // console.log(data);
          const { token } = data.register;
          localStorage.setItem("auth-token", token);
          this.props.history.push("/");
        }}
        update={(client, data) => this.updateCache(client, data)}
      >
        {registerUser => (
          <div className="session-form">
            <h1 className="session-header">Register</h1>
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
                className="session-input-box"
                value={this.state.name}
                onChange={this.update("name")}
                required
                type="text"
              />
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
              {/* login is the placeholder path */}
              <Link to="/register" className="session-guest-link">Guest Demo</Link>
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
