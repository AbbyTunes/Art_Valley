import React from "react";
import { Mutation } from "react-apollo";
import { withRouter } from "react-router-dom";
import Queries from "../../graphql/queries";
import Mutations from "../../graphql/mutations";
const { DELETE_ARTICLE } = Mutations;

class ArticleDelete extends React.Component {
    constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
    }

    delete(deleteArticle) {
      deleteArticle({ variables: { _id: this.props.match.params.articleId } })
        .then(this.props.history.push("/community"))
    }

    render () {
        return(
            <Mutation
            mutation={DELETE_ARTICLE}
            // update={(cache, data) => this.updateCache(cache, data)}
            >
                {deleteArticle => (
                    <a
                    className="comment-body-delete"
                    onClick={e => {
                        this.delete(deleteArticle);
                        // e.preventDefault();
                        // deleteArticle({ variables: { _id: this.props.match.params.articleId } });
                    }}
                    >
                    Delete
                    </a>
                    )}
            </Mutation>     
        );
    }
}

export default withRouter(ArticleDelete);