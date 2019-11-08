import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { withRouter } from "react-router-dom";
import mutations from "../../graphql/mutations";
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
          <div>
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
              <input
                value={this.state.name}
                onChange={this.update("name")}
                placeholder="Name"
              />
              <input
                value={this.state.email}
                onChange={this.update("email")}
                placeholder="Email"
              />
              <input
                value={this.state.password}
                onChange={this.update("password")}
                type="password"
                placeholder="Password"
              />
              <button type="submit">Register</button>
            </form>
          </div>
        )}
      </Mutation>
    );
  }
}

export default withRouter(Register);
