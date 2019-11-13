import React from "react";
import { Mutation } from "react-apollo";
import "./article_create.css";
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
        newArticle({
            variables: {
                title: this.state.title,
                body: this.state.body,
                photoLink: this.state.photoLink,
                author: localStorage.getItem("currentUserId")
            }
        })
            .then(data => {
                this.setState({
                    title: "", body: "", photoLink: ""
                });
            })
    }

    render() {
        return (
            <Mutation mutation={CREATE_ARTICLE}>
                {(newArticle, { data }) => (
                    <form className="article-create-form" onSubmit={(e) => this.handleSubmit(e, newArticle)}>
                        <input value={this.state.title} onChange={this.update("title")} />
                        <textarea value={this.state.body} onChange={this.update("body")} />
                        {/* image here */}
                        <input type="submit" value="Save Article" />
                    </form>
                )}
            </Mutation>
        );
    }
}

export default ArticleCreate;