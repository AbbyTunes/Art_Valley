import gql from "graphql-tag";
 
export default {
  IS_LOGGED_IN: gql`
    query IsUserLoggedIn {
      isLoggedIn @client
    }
  `,
  // IS_CURRENT_USER: gql`
  //   query isCurrentUser {
  //     isCurrentUser @client
  //   }
  // `,
  FETCH_ART: gql`
    query artById($artId: ID!) {
      artById(_id: $artId) {
        id
        author {
          id
          name
          publishedArts {
            id
            title
            photoLink
				videoLink
            author {
				id
				name
				publishedArts {
					id
					title
				}
            }
          }
          likedArts {
            id
            title
            photoLink
			videoLink
          }
        }
        photoLink
		videoLink
        title
        description
        likers {
			id
			name
        }
        category {
          id
          name
			arts {
				id
				title
			}
        }
        comments {
          body
          author {
            name
            id
          }
          id
        }
      }
    }
  `,
  FETCH_CATEGORY_BY_NAME: gql`
    query categoryByName($name: STRING!) {
      categoryByName(name: $name) {
        id
        author {
          id
          name
          publishedArts {
            id
            title
            photoLink
            author {
              id
            }
          }
          likedArts {
            id
            title
            photoLink
          }
        }
        photoLink
        title
        description
        likers {
          id
          name
        }
        category {
          id
          name
        }
        comments {
          body
          author {
            name
            id
          }
          id
        }
      }
    }
  `,
  FETCH_ARTS_BY_CATEGORY: gql`
    query artsByCategory($categoryId: ID!) {
      artsByCategory(categoryId: $categoryId) {
        id
        author {
          id
          name
          publishedArts {
            id
            title
            photoLink
						videoLink
            author {
              id
            }
          }
          likedArts {
            id
            title
            photoLink
						videoLink
          }
        }
        photoLink
				videoLink
        title
        description
        likers {
          id
          name
        }
        category {
          id
          name
        }
        comments {
          body
          author {
            name
            id
          }
          id
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
          videoLink
        }
        publishedArts {
          id
          title
          photoLink
          videoLink
        }
        publishedArticles {
          id
          title
          body
          photoLink
        }
        location
        bio
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
  FETCH_CATEGORIES: gql`
    query categories {
      categories {
        id
        name
        arts {
          id
          title
        }
      }
    }
  `,
  FETCH_ARTICLES: gql`
    query articles {
      articles {
        id
        title
        body
        header
        author {
          id
          name
        }
        photoLink
        comments {
          id
          body
          author {
            id
            name
          }
        }
        likers {
          id
          name
        }
      }
    }
  `,
  FETCH_ARTICLE: gql`
    query article($_id: ID!) {
      article(_id: $_id) {
        id
        title
        body
        header
        author {
          id
          name
        }
        photoLink
        comments {
          id
          body
          author {
            id
            name
          }
        }
        likers {
          id
          name
        }
      }
    }
  `
};
