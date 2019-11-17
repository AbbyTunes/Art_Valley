import React from "react";
import { Mutation } from "react-apollo";
import { withRouter } from "react-router-dom";
import Queries from "../../graphql/queries";
import Mutations from "../../graphql/mutations";
const { DELETE_ART } = Mutations;

class ArtDelete extends React.Component {
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
  }

  confirmDelete(deleteArt) {
    let result = window.confirm("Delete this piece permanently?")
    if (result) {
      this.delete(deleteArt)
    }
  }

  delete(deleteArt) {
    deleteArt({
      variables: { _id: this.props.match.params.artId }
    }).then(this.props.history.push("/arts"));
  }

  render() {
    return (
      <Mutation
        mutation={DELETE_ART}
        // update={(cache, data) => this.updateCache(cache, data)}
      >
        {deleteArt => (
          <a
            className="comment-body-delete"
            onClick={e => {
              // this.delete(deleteArt);
              this.confirmDelete(deleteArt);
            }}
          >
            Delete
          </a>
        )}
      </Mutation>
    );
  }
}

export default withRouter(ArtDelete);
