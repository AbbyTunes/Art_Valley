import React from "react";
import { Mutation, Query } from "react-apollo";
import Mutations from "../../graphql/mutations";
import Queries from "../../graphql/queries";
import TextareaAutosize from "react-textarea-autosize";
import { ApolloCache } from "apollo-cache";
import "./settings.css";
import { InMemoryCache } from "apollo-cache-inmemory";
const { FETCH_USER } = Queries;
const { EDIT_USER_SETTINGS, VERIFY_USER } = Mutations;

class Settings extends React.Component {
  constructor(props) {
      console.log("PROPS")
      console.log(props)
    super(props);
    this.state = {
      clicked: props.clicked,
      name: props.user.user.name,
      email: props.user.user.email,
      location: props.user.user.location || "",
      bio: props.user.user.bio || ""
    };
    // console.log(this.state)

  }


  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }


  render() {
    const queryUser = (
      <Query query={FETCH_USER} variables={{ _id: localStorage.currentUserId }}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error</p>;
            // this.setState( {
            //     username: data.user.name,
            //     email: data.user.email
            // })
          const userData = data;
          return <div className="settings-form">{settingsForm(userData)}</div>;
        }}
      </Query>
    );

    const settingsDisplay = (
      <div className="settings-form-display">
        <span className="session-errors"></span>
        {/* <h3 className="session-input-title">Username</h3>
        <div className="settings-input-info">{this.props.user.user.name}</div>
        <h3 className="session-input-title">Email Address</h3>
        <div className="settings-input-info">{this.props.user.user.email}</div> */}
        <h3 className="session-input-title">Location</h3>
        <div className="settings-input-info">
          {this.props.user.user.location}
        </div>
        <h3 className="session-input-title">Bio</h3>
        <div className="settings-input-info">{this.props.user.user.bio}</div>
      </div>
    );

    const settingsForm = userData => {
      return (
        <Mutation
          mutation={EDIT_USER_SETTINGS}
          
          onError={err => this.setState({ message: err.message })}
        >
          
          { editSettings => {
              return (
                <div>
                  <span className="session-errors">{this.state.message}</span>
                  <form
                    onSubmit={e => {
                      e.preventDefault();
                      editSettings({
                        variables: {
                          id: userData.user.id,
                          name: this.state.name,
                          email: this.state.email,
                          location: this.state.location,
                          bio: this.state.bio
                        }
                      }).then(resp => {
                        console.log(resp)
                        localStorage.setItem("currentUsername", this.state.username);
                        window.location.reload();
                      })
                      
                    }}
                  >
                    <h3 className="session-input-title">Username</h3>
                    <input
                      type="text"
                      className="session-input-box"
                      value={this.state.name}
                      placeholder={userData.user.name}
                      onChange={this.update("name")}
                    />
                    <h3 className="session-input-title">Email Address</h3>
                    <input
                      type="text"
                      className="session-input-box"
                      value={this.state.email}
                      placeholder={userData.user.email}
                      onChange={this.update("email")}
                    />
                    <h3 className="session-input-title">Location</h3>
                    <input
                      type="text"
                      className="session-input-box"
                      value={this.state.location}
                      placeholder={userData.user.location}
                      onChange={this.update("location")}
                    />

                    <h3 className="session-input-title">Bio</h3>
                    <div className="settings-spacer" />
                    <TextareaAutosize
                      className="comment-form"
                      value={this.state.bio}
                      onChange={this.update("bio")}
                      placeholder={userData.user.bio}
                      type="text"
                    />

                    <div className="session-spacer" />
                    <button className="session-button" type="submit">
                      Edit user
                    </button>
                  </form>
                </div>
              )}}
        </Mutation>
      );
    };

    if (this.state.clicked ) {
        return <div className="settings-container">{queryUser}</div>;
    } else {
        return (
            <div className="settings-container"> {settingsDisplay}</div>
        )
    }
    
  }
}

export default Settings;
