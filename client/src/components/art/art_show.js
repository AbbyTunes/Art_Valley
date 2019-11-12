import React, { Component } from "react";
import { Query } from "react-apollo";
import "./art_index.css"
import { Link, withRouter } from "react-router-dom";
import Queries from "../../graphql/queries";
const { FETCH_ART } = Queries;

class ArtShow extends Component {

	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div clasName="art-container">Art Show</div>
		)
	}

}

export default withRouter(ArtShow);