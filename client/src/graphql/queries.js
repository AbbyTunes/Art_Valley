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
		query artById($_id: ID!) {
			artById(id: $id) {
				id
				authorId
				videoLink
				photoLink
				title
			}
		}
	`,
	FETCH_ART: gql`
		query artById($_id: ID!) {
			artById(id: $id) {
				id
				author {
					id
					name
				}
				videoLink
				photoLink
				title
				description
				likers
				category
				comments { 
					body
				}
			}
		}
	`,
	FETCH_ARTS_BY_CATEGORY: gql`
		query artsByCategory($categoryId: ID!) {
			artsByCategory(categoryId: $categoryId) {
				id
				author{
					id
					name
				}
				videoLink
				photoLink
				title
				description
				likers{
					id
					name
				}
				category {
					id
					name
				}
			}
		}
	`,
	FETCH_ARTS_BY_AUTHOR: gql`
		query artsByAuthor($authorId: ID!) {
			artsByAuthor(authorId: $authorId) {
				id
				author{
					id
					name
				}
				videoLink
				photoLink
				title
				description
				likers{
					id
					name
				}
				category {
					id
					name
				}
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
	FETCH_COMMENT: gql`
		query comment($_id: ID!) {
			comment(_id: $id) {
				id
				body
				art { 
					title
				}
				author {
					name
				}
			}
		}
	`,
	FETCH_COMMENTS: gql`
		query comments {
			comments {
				id
				body
				art {
					title
				}
				author {
					name
				}
			}
		}
	`,
};
