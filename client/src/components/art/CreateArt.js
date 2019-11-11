import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
import "./art.css";
import Mutations from "../../graphql/mutations";
import Queries from "../../graphql/queries";
const { CREATE_ART } = Mutations;
const { FETCH_ART, FETCH_USER } = Queries;

class CreateArt extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    
    this.state = {
      category: "",
      authorId: "",
      title: "",
      description: "",
      photoLink: ""
    };
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  // we need to remember to update our cache directly with our new art
  updateCache(cache, { data }) {
    let arts;
    console.log(data);
    try {
      // if we've already fetched the arts then we can read the
      // query here
      arts = cache.readQuery({ query: FETCH_ART });
    } catch (err) {
      return;
    }
    // if we had previously fetched arts we'll add our new art to our cache
    if (arts) {
      let artArray = arts.arts;
      let newArt = data.newArt;
      cache.writeQuery({
        query: FETCH_ART,
        data: { arts: artArray.concat(newArt) }
      });
    }
  }

  handleSubmit(e, newArt, user) {
    e.preventDefault();
    console.log(user)
    newArt({
      variables: {
        category: this.state.category,
        authorId: user.id,
        title: this.state.title,
        description: this.state.description,
        photoLink: this.state.photoLink
      }
    });
  }

  render() {
    const fetchUser = (
      <Query query={FETCH_USER} variables={{ _id: localStorage.currentUserId }}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error</p>;
          console.log(data);
          const user = data.user;

          return (
            <div className="profile-container">
              {createArtForm(user)}
            </div>
          )
        }}
      </Query>
    )

    const createArtForm = (user) => (
      <Mutation
        mutation={CREATE_ART}
        onError={err => this.setState({ message: err.message })}
        update={(cache, data) => this.updateCache(cache, data)}
        onCompleted={data => {
          const { name } = data.newArt;
          this.setState({
            message: `New art ${name} created successfully`
          });
        }}
      >
        {(newArt, { data }) => (
          <div className="art-form-container">
            <form onSubmit={e => this.handleSubmit(e, newArt, user)}>
              <div className="art-form-header-bar">
                  <select 
                    className="art-form-category"
                    name="select"
                    id="select"> 
                  <option value="Photo">Photo</option>
                  <option value="Video">Video</option>

                  </select>
              </div>
              
              <div className="art-form-content">
                <div className="art-form-image-preview">
                  adsfdsfsfda
              </div>
              
                <input
                  className="art-form-field-title"
                  onChange={this.update("title")}
                  value={this.state.title}
                  placeholder="Add your title"
                />
                <div className="art-form-field-name">
                  <div className="art-form-field-user-icon" />{user.name}
                </div>

                <div
                  className="art-form-field-description"
                  contentEditable="true"
                  value={this.state.description}
                  data-text="Tell everybody what your art is about">
                </div>
                
 
                {/* <textarea
                  className="art-form-field-description"
                  onChange={this.update("description")}
                  value={this.state.description}
                  placeholder="Tell everybody what your Art is about"
                  type="text"
                /> */}
                <input
                  onChange={this.update("photoLink")}
                  value={this.state.photoLink}
                  placeholder="Link"
                  type="text"
                />
                <button type="submit">Create Art</button>
              </div>
             
              
              
             
            </form>
            <p>{this.state.message}</p>
          </div>
        )}
      </Mutation>
    )

    return (
      <div>
        {fetchUser}
      </div>
    );
  }
}

export default CreateArt;