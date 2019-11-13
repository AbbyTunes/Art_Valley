import React from "react";
import { Mutation, Query } from "react-apollo";
import Mutations from "../../graphql/mutations";
import Queries from "../../graphql/queries";
import TextareaAutosize from "react-textarea-autosize";
import { ApolloCache } from "apollo-cache";
import CommentDetail from "./CommentDetail";
import "./comment.css"
const { FETCH_ART } = Queries;
const { ADD_COMMENT } = Mutations;

class CreateComment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          body: "",
          author: localStorage.currentUserId,
          art: this.props.artId,
          comments: [],
          forceRender: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateCache = this.updateCache.bind(this);
    }

    update() {
        return e => this.setState({ body: e.target.value });
    }

    updateCache(cache, data) { // update cache instead of setState
      const artwork = cache.readQuery({
        query: FETCH_ART,
        variables: {
          artId: this.state.art
        }
      });
      console.log(artwork.artById);
      artwork.artById.comments.push(data.data.newComment);
      cache.writeQuery({ query: FETCH_ART, data: [artwork.artById] })

    }

    handleSubmit(e, newComment) {
        e.preventDefault();
        this.setState({forceRender: !this.state.forceRender});
      newComment({
          variables: {
            body: this.state.body,
            author: this.state.author,
            art: this.state.art
          }
        })
        .then(data => {
          this.setState({
            body: "",
          }
          );
        })
     
    }

    render() {
      const queryArt = (
        <Query query={FETCH_ART} variables={{ artId: this.state.art }}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error</p>;
            const commentData = data.artById.comments;
            return (
              <div>
                {queryMutation(commentData)}
              </div>
            );
          }}
        </Query>
      );

      const queryMutation = commentData => {
        return (
          <Mutation
            mutation={ADD_COMMENT}
            update={(cache, data) => this.updateCache(cache, data)}
          >
            {newComment => (
              <form onSubmit={e => this.handleSubmit(e, newComment)}>
                <div className="comment-form-container">
                  <TextareaAutosize
                    className="comment-form"
                    value={this.state.body}
                    onChange={this.update()}
                    placeholder="Leave a comment"
                    type="text"
                    required
                  />
                  <input
                    className="comment-submit"
                    type="submit"
                    value="Add Comment"
                  />
                  <div className="comment-line" />
                </div>
                <ul>
                  {commentData.map((comment, idx) => {
                    return (
                      <CommentDetail key={idx + 10001} comment={comment} />
                    );
                  })}
                </ul>
              </form>
            )}
          </Mutation>
        );
      };

        return (
          <div>
            {queryArt}
          </div>
        );
    }
}

export default CreateComment;