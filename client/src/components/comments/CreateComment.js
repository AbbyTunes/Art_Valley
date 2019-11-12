import React from "react";
import { Mutation } from "react-apollo";
import Mutations from "../../graphql/mutations";
const { ADD_COMMENT } = Mutations;

class CreateComment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {body: ""};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    update() {
        return e => this.setState({ body: e.target.value });
    }

    handleSubmit(e, newComment) {
        e.preventDefault();
        let body = this.state.body;
        newComment({
            variables: {
                body: body,
                author: localStorage.getItem("currentUserId"),
                art: this.props.match.params.artId
            }
        })
            .then(data => {
                this.setState({
                    body: ""
                });
            })
    }

    render() {
        return(
            <Mutation mutation={ADD_COMMENT}>
                {(newComment, { data }) => (
                    <form onSubmit={(e) => this.handleSubmit(e, newComment)}>
                        <textarea value={this.state.body} onChange={this.update()}/>
                        <input type="submit" value="Add Comment" />
                    </form>
                )}
            </Mutation>
        );
    }
}

export default CreateComment;