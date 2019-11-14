import React from "react";
import { Mutation } from "react-apollo";
import "./article_create.css";
import Mutations from "../../graphql/mutations";
import TextareaAutosize from "react-textarea-autosize";
import axios from "axios";
const { CREATE_ARTICLE } = Mutations;
 
let endpoint;
if (process.env.NODE_ENV === "production") {
  endpoint = `/api/article/upload`;
} else {
  endpoint = "http://localhost:5000/api/article/upload";
}

class ArticleCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      author: localStorage.currentUserId,
      body: "",
      photoLink: "",
      header: "",
      previewUrl: "",
      message: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  handleSelectedFile = e => {
    e.preventDefault();
    let file = e.target.files[0];
    let fileReader = new FileReader();
    fileReader.onloadend = () => {
      this.setState({ photoLink: file, previewUrl: fileReader.result });
    };
    if (file) {
      fileReader.readAsDataURL(file);
    }
  };

  //   handleSubmit(e, newArticle) {
  //     e.preventDefault();
  //     newArticle({
  //       variables: {
  //         title: this.state.title,
  //         body: this.state.body,
  //         photoLink: this.state.photoLink,
  //         header: this.state.header,
  //         author: localStorage.getItem("currentUserId")
  //       }
  //     }).then(data => {
  //       this.setState({
  //         title: "",
  //         body: "",
  //         photoLink: "",
  //         header: ""
  //       });
  //     });
  //   }

  handleSubmit(e) {
    e.preventDefault();
    // if (this.state.previewUrl){
        
    // }
    const data = new FormData(e.target);
    data.append("file", this.state.photoLink);
    data.append("title", this.state.title);
    data.append("header", this.state.header);
    data.append("author", this.state.author);
    data.append("body", this.state.body);
    axios.post(endpoint, data).then(response => {
      console.log(endpoint);
      console.log(data);

      console.log(response);
      if (response.data && response.status === 200) {
        this.setState({ message: "Art successfully uploaded!" });
        console.log(data);
      } else {
        this.setState({ message: "Art upload was not successful" });
      }
    });
  }

  render() {
    // return (
    //   <Mutation mutation={CREATE_ARTICLE}>
    //     {(newArticle, { data }) => (
    //       <form
    //         className="article-create-form"
    //         onSubmit={e => this.handleSubmit(e, newArticle)}
    //       >
    //         <input value={this.state.title} onChange={this.update("title")} />
    //         <textarea
    //           value={this.state.header}
    //           onChange={this.update("header")}
    //         />
    //         <textarea value={this.state.body} onChange={this.update("body")} />
    //         {/* image here */}
    //         <input type="submit" value="Save Article" />
    //       </form>
    //     )}
    //   </Mutation>
    // );
    let preview = this.state.previewUrl ? (
      <img className="article-form-image-previewed" src={this.state.previewUrl} />
    ) : (
      <span
        role="img"
        alt=""
        aria-label="debug"
        className="article-form-image-debug-icon"
      >
        📷
      </span>
    );
    return (
      <form className="article-create-form" onSubmit={this.handleSubmit}>
        <div className="article-form-image-preview">{preview}</div>
        <div className="form-group">
          <input type="file" name="" id="" onChange={this.handleSelectedFile} />
        </div>
        <input className="article-title-input" value={this.state.title} onChange={this.update("title")} placeholder="Title"/>
        <textarea className="article-title-header" value={this.state.header} onChange={this.update("header")} placeholder="Header"/>
        <textarea className="article-title-body" value={this.state.body} onChange={this.update("body")} placeholder="Body"/>
        {/* image here */}
        <input type="submit" value="Save Article" />
        <div>{this.state.message}</div>
      </form>
    );
  }
}

export default ArticleCreate;