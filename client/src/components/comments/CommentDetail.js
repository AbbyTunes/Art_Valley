import React from "react";
import "./comment.css";
import { Mutation, Query } from "react-apollo";
import Mutations from "../../graphql/mutations";
import Queries from "../../graphql/mutations";
const { DELETE_COMMENT } = Mutations;
const { FETCH_COMMENT} = Queries;

class CommentDetail extends React.Component {
  constructor(props) {
    console.log(localStorage)
    super(props);
    this.state = {
      
    };
  }

  deleteComment() {
    if (localStorage.currentUserId === this.props.comment.author.id) {
      return (
        <Mutation
          mutation={DELETE_COMMENT}
          refetchQueries={() => {
            return [
              {
                // query: FETCH_COMMENT({ id: this.props.comment.id })
              }
            ];
          }}

        >
          {(deleteComment, { data }) => (
            <a
              className="comment-body-delete"
              onClick={e => {
                e.preventDefault();
                deleteComment({ variables: { id: this.props.comment.id } });
                console.log(this.props.comment.id);
                console.log(data)
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

