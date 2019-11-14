import React from "react";
import "./comment.css";
import { Mutation, Query } from "react-apollo";
import Mutations from "../../graphql/mutations";
import Queries from "../../graphql/queries";
import { merge } from 'lodash'
const { DELETE_COMMENT } = Mutations;
const { FETCH_ART} = Queries;

class CommentDetail extends React.Component {
  constructor(props) {
    console.log(props)
    super(props);
    this.state = {
      body: "",
      author: ""
    };
  }

  updateCache(cache, data) { // update cache instead of setState

    const artwork = cache.readQuery({
      query: FETCH_ART,
      variables: {
        artId: this.props.artId

      }
    });
    let newArtwork = merge({}, artwork.artById);

    // console.log(newArtwork);
    // console.log(artwork.artById.comments);
    newArtwork.comments = artwork.artById.comments.filter( (comment) => {
      return comment.id !== data.data.deleteComment.id
    })

    // console.log(artwork.artById.comments);
    // console.log("WRITE QUERY STUFF BELOW VVVV")
    // console.log(newArtwork)
    
    // console.log(artwork.artById)
    cache.writeQuery({
      query: FETCH_ART, data: { artById: newArtwork} , 
      variables: {
        artId: this.props.artId

      } })

  }


  deleteComment() {
    if (localStorage.currentUserId === this.props.comment.author.id) {
      return (
        <Mutation
          mutation={DELETE_COMMENT}
          update={(cache, data) => this.updateCache(cache, data)}
          // refetchQueries={() => {
          //   return [
          //     {
          //       // query: FETCH_COMMENT({ id: this.props.comment.id })
          //     }
          //   ];
          

        >
          {(deleteComment) => (
            <a
              className="comment-body-delete"
              onClick={e => {
                e.preventDefault();
                deleteComment({ variables: { id: this.props.comment.id } });
              }}
            >
             Delete
            </a>
          )}
          
        </Mutation >
      )}
  }

  render () {

    return (
      <div className="comment-container">
        <div className="comment-icon-container">
          <div className="comment-author-icon">
            <span
              role="img"
              alt=""
              aria-label="debug"
              className="comment-author-icon-pic"
            >
              {this.props.comment.author.name.slice(0, 1)}
            </span>
          </div>
        </div>
        <div className="comment-body-container">
          <div className="comment-author">{this.props.comment.author.name}</div>
          
          <div className="comment-body">{this.props.comment.body}</div>
          {this.deleteComment()}
          
            
          
        </div>
      </div>
    );
  }
  

}

export default CommentDetail;

