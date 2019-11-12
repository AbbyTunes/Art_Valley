import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
import "./art.css";
import "./art.js";
import Mutations from "../../graphql/mutations";
import Queries from "../../graphql/queries";
import TextareaAutosize from "react-textarea-autosize";
const { CREATE_ART } = Mutations;
const { FETCH_ART, FETCH_USER } = Queries;

class CreateArt extends Component {
  constructor(props) {
    super(props);


    
    this.state = {
      category: "Photo", // default to debug
      author: localStorage.currentUserId,
      title: "",
      description: "",
      photoLink: ""
    };
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  updateCache(cache, { data }) {
    let arts;
    try {
      arts = cache.readQuery({ query: FETCH_ART });
    } catch (err) {
      return;
    }
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
    if (this.state.category === "Photo"){
      this.setState({
        category: "5dc9a1c883d5a53746a785a2"//debug id for...whatever reason
      })
    } else {
      this.setState({
        category: "5dc603aa4dc3a23d54cbb4fb" // video
      })
    }
    newArt({
      variables: {
        category: this.state.category,
        author: this.state.author,
        title: this.state.title,
        description: this.state.description,
        photoLink: this.state.photoLink
      }
    });
  }

  render() {

    console.log(this.state)

    const fetchUser = (
      <Query query={FETCH_USER} variables={{ _id: localStorage.currentUserId }}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error</p>;
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
                    value={this.state.category}
                    onChange={this.update("category")}> 
                      <option value="Photo">Photo</option>
                      <option value="Video">Video</option>
                  </select>
              </div>
              
              <div className="art-form-content">
                <div className="art-form-image-container">
                  <div className="art-form-image-preview">
                    <span role="img" alt="" aria-label="debug" className="art-form-image-debug-icon">
                      📷
                    </span>
                  </div>
                  <div className="art-form-field-link-container">
                    <input
                      className="art-form-field-link-url"
                      onChange={this.update("photoLink")}
                      value={this.state.photoLink}
                      placeholder="Place URL for image/video here"
                      type="text"
                    />
                  </div>
                </div>
                
                <input
                  className="art-form-field-title"
                  onChange={this.update("title")}
                  value={this.state.title}
                  placeholder="Add your title"
                  maxLength="40"
                />
                <div className="art-form-field-name">
                  <div className="art-form-field-user-icon">
                    <span role="img" alt="" aria-label="debug" className="art-form-field-user-icon-pic">
                    👤
                    </span>
                  </div>
                  <span className="art-form-field-user-icon-text">{localStorage.currentUsername}</span>
                  
                </div>

                {/* <div
                  className="art-form-field-description"
                  onChange={this.update("description")}
                  contentEditable="true"
                  value={this.state.description}
                  type="text"
                  data-text="Tell everybody what your art is about"
                  spellCheck="false" />

              </div> */}
              </div>
              <TextareaAutosize 
                className="art-form-field-description"
                value={this.state.description}
                onChange={this.update("description")}
                data-text="Tell everybody what your art is"
                type="text"
                spellCheck="false"
                placeholder="Tell everybody what your art is"/>
              
              
              <button className="art-form-field-submit" type="submit">Create Art</button>
             
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