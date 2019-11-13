import React from "react";
import { Mutation } from "react-apollo";
import Mutations from "../../graphql/mutations";
const { CREATE_ARTICLE } = Mutations;

class ArticleCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = { title: "", body: "", photoLink: ""};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    update(field) {
        return e => this.setState({ [field]: e.target.value });
    }

    handleSubmit(e, newArticle) {
        e.preventDefault();
        ({ title, body, photoLink }) = this.state
        newArticle({
            variables: {
                title: title,
                body: body,
                photoLink: photoLink,
                author: localStorage.getItem("currentUserId"),
                // art: this.props.match.params.artId
                //test below//
                art: "5dc8623a1c9d44000003a6af"
            }
        })
            .then(data => {
                this.setState({
                    body: ""
                });
            })
    }

    render() {
        return (
            <Mutation mutation={ADD_COMMENT}>
                {(newComment, { data }) => (
                    <form onSubmit={(e) => this.handleSubmit(e, newComment)}>
                        <textarea value={this.state.body} onChange={this.update()} />
                        <input type="submit" value="Add Comment" />
                    </form>
                )}
            </Mutation>
        );
    }
}

export default ArticleCreate;