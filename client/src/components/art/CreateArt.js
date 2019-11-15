import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
import "./art.css";
import "./art.js";
import Mutations from "../../graphql/mutations";
import Queries from "../../graphql/queries";
import TextareaAutosize from "react-textarea-autosize";
import axios from "axios";
const { CREATE_ART } = Mutations;
const { FETCH_ART, FETCH_USER, FETCH_CATEGORIES } = Queries;

 
let endpoint;
if (process.env.NODE_ENV === "production") {
  endpoint = `/api/art/upload`;
} else {
  endpoint = "http://localhost:5000/api/art/upload";
}

class CreateArt extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: "", // default to debug
      author: localStorage.currentUserId,
      title: "",
      description: "",
      photoLink: "",
      previewUrl: "",
      message: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSelectedFile = e => {
    e.preventDefault();
    let file = e.target.files[0];
    let fileReader = new FileReader();
    fileReader.onloadend = () => {
      this.setState({photoLink: file, previewUrl: fileReader.result});
    };
    if(file){
      fileReader.readAsDataURL(file);
    }
  };


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

  handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    if (this.state.category === "Photo") {
      this.setState({
        category: "5dc9a1c883d5a53746a785a2" //debug id for...whatever reason
      });
    } else {
      this.setState({
        category: "5dc603aa4dc3a23d54cbb4fb" // video
      });
    }
    data.append("file", this.state.photoLink);
    data.append("title",this.state.title);
    data.append("category",this.state.category);
    data.append("author",this.state.author);
    data.append("description",this.state.description);
    axios.post(endpoint, data).then( (response) => {

      if (response.data && response.status === 200) { 
        this.setState({ message: "Art successfully uploaded!" })
        const redirectId = response.data.data._id;
        this.props.history.push(`/arts/${redirectId}`);
      } else {
        this.setState({ message: "Art upload was not successful" })

      }
    })
    

  }

  render() {
    console.log(this.state);
    let preview = this.state.previewUrl ? 
      <img className="art-form-image-previewed" src={this.state.previewUrl} /> 
          : <span
              role="img"
              alt=""
              aria-label="debug"
              className="art-form-image-debug-icon">📷</span>;
    if (!localStorage.length) {
      return <div className="profile-container">Please Log in!</div>
    } else {
    return(
      <div className="profile-container">
          <div className="art-form-container">
            <form onSubmit={e => this.handleSubmit(e)}>
              <div className="art-form-header-bar">
                <select
                  className="art-form-category"
                  value={this.state.category}
                  onChange={this.update("category")}
                >
                  <option value="Photo">Photo</option>
                  <option value="Video">Video</option>
                </select>
              </div>

              <div className="art-form-content">
                <div className="art-form-image-container">
                  <div className="art-form-image-preview">
                    {preview}
                    
                  </div>
                  {/* <div className="art-form-field-link-container">
                    <input
                      className="art-form-field-link-url"
                      onChange={this.handleSelectedFile}
                      value={this.state.photoLink}
                      placeholder="Place URL for image/video here"
                      type="text"
                    /> */}
                    <div className="form-group">
                      <input
                        type="file"
                        name=""
                        id=""
                        onChange={this.handleSelectedFile}
                      />
                  </div>
                </div>

                <input
                  className="art-form-field-title"
                  onChange={this.update("title")}
                  value={this.state.title}
                  placeholder="Add your title"
                  maxLength="40"
                  required
                />
                <div className="art-form-field-name">
                  <div className="art-form-field-user-icon">
                    <span
                      role="img"
                      alt=""
                      aria-label="debug"
                      className="art-form-field-user-icon-pic"
                    >
                      👤
                    </span>
                  </div>
                  <span className="art-form-field-user-icon-text">
                    {localStorage.currentUsername}
                  </span>
                </div>
              </div>
              <TextareaAutosize
                className="art-form-field-description"
                value={this.state.description}
                onChange={this.update("description")}
                data-text="Tell everybody what your art is"
                type="text"
                spellCheck="false"
                placeholder="Tell everybody what your art is"
              />

              <button className="art-form-field-submit" type="submit">
                Create Art
              </button>
            </form>
            <div >
             {this.state.message}
            </div>
            
          </div>
        </div>
    );}
  }
}

export default CreateArt;