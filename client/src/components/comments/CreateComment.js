import React from "react";
import { Mutation } from "react-apollo";
import Mutations from "../../graphql/mutations";
const { ADD_COMMENT } = Mutations;

class CreateComment extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			body: "",
			author: localStorage.currentUserId,
			art: this.props.art
		};
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	update() {
		return e => this.setState({ body: e.target.value });
	}

	handleSubmit(e, newComment) {
		e.preventDefault();
		// let body = this.state.body;
		// console.log(this.state)

		newComment({
			variables: {
				body: this.state.body,
				author: this.state.author,
				art: this.state.art
			}
			// variables: {
			// 	body: body,
			// 	author: localStorage.getItem("currentUserId"),
			// 	// art: this.props.match.params.artId
			// 	art: this.props.art
			// 	//test below//
			// 	// art: "5dc8623a1c9d44000003a6af"
			// }
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

export default CreateComment;