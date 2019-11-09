import gql from "graphql-tag";

export default {
  IS_LOGGED_IN: gql`
    query IsUserLoggedIn {
			isLoggedIn @client
    }
  `,
	FETCH_ART: gql`
		query art($_id: ID!) {
			art(id: $id) {
				id
				authorId
				videoLink
				photoLink
				title
				description
				likes
				likers
				category
			}
		}
	`
};
