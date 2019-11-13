import React from "react";

class CommentIndex extends React.Component {
  constructor(props) {
   
    super(props);
    this.state = {
      comments: this.props.comments || [],
    };
  }


  render() {
      console.log(this.state.comments)
      return (
        <div>
          <h2>COMMENT COMPONENT LIST: </h2>
          <ul>
            {this.state.comments.map((comment, idx) => {
              return <li key={idx+10001}>{comment.body}</li>;
            })}
          </ul>
        </div>
      )
    }
  
}

export default CommentIndex;
