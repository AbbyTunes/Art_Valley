import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

class ArticleEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            article: {}
        };
    }

    update = e => {
        const article = this.state.article;
        article[e.target.name] = e.target.value;
        this.setState({
            article: article
        });
    };


    handleSubmit = event => {
        event.preventDefault();

        const article = this.state.article

        axios
            .put("/api/article/edit/" + this.props.match.params.articleId, article)
            .then(() => {
                this.props.history.push("/community/");
            })
            .catch(error => {
                debugger;
                alert("Oops some error happened, please try again");
            });
    };

    // When this DocumentEdit component mounts I want the existing 'description' to be fetched.
    componentDidMount() {
        axios.get(`/api/article/${this.props.match.params.articleId}`).then(res => {
            this.setState({ article: res.data });
        });
    }

    render() {
        const { title, body, header } = this.state.article;

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Edit title:</label>
                        <input
                            type="text"
                            value={title}
                            class="form-control"
                            name="title"
                            onChange={this.update}
                            placeholder=" Enter the new title"
                        />
                        <label htmlFor="body">Edit body:</label>
                        <label htmlFor="header">Edit header:</label>
                        <input
                            type="text"
                            value={header}
                            class="form-control"
                            name="header"
                            onChange={this.update}
                            placeholder=" Enter the new header"
                        />
                        <input
                            type="text"
                            value={body}
                            class="form-control"
                            name="body"
                            onChange={this.update}
                            placeholder=" Enter the new body"
                        />
                    </div>
                    <button type="submit" class="btn btn-primary">
                        Submit the updated article
                    </button>
                </form>
            </div>        
        );
    }
}

export default withRouter(ArticleEdit);