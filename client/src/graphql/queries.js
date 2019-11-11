import gql from "graphql-tag";
 
export default {
  IS_LOGGED_IN: gql`
    query IsUserLoggedIn {
			isLoggedIn @client
    }
	`,
	FETCH_ARTS: gql`
		query arts {
			arts {
				id
				authorId
				videoLink
				photoLink
				title
			}
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
	`,
	FETCH_ART_BY_CATEGORY: gql`
		query findArtByCategory($categoryId: ID!) {
			art(categoryId: $categoryId) {
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
	`,
	FETCH_ART_BY_USER: gql`
		query findArtbyUser($userId: ID!) {
			art(userId: $userId) {
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
	`,
	FETCH_USER: gql`
		query user($_id: ID!) {
			user(_id: $_id) {
				id
				name
				email
				likedArts {
					id
					title
					photoLink
				}
				publishedArts {
					id 
					title
					photoLink
				}
			}
		}
	`,
};
