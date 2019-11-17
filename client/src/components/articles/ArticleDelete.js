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
        this.confirmDelete = this.confirmDelete.bind(this);
        
    }

    confirmDelete(deleteArticle) {
        let result = window.confirm("Delete this article permanently?")
        if (result) {
            this.delete(deleteArticle)
        }
    }

    delete(deleteArticle) {
        // debugger
    // console.log(this.props.article.author.id);
      deleteArticle({ variables: { _id: this.props.article.id,
        author: this.props.article.author.id } })
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
                        this.confirmDelete(deleteArticle);
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