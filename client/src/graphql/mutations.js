import gql from "graphql-tag";

export default {
  REGISTER_USER: gql`
    mutation RegisterUser($name: String!, $email: String!, $password: String!) {
      register(name: $name, email: $email, password: $password) {
        name
        email
        loggedIn
        id
        token

      }
    }
  `,
  LOGIN_USER: gql`
    mutation LoginUser($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        id
        token
        loggedIn
        name
      }
    }
  `,
  EDIT_USER_SETTINGS: gql`
    mutation EditSettings(
      $id: ID!
      $email: String!
      $name: String!
      $location: String!
      $bio: String!
    ) {
      editSettings(
        id: $id
        email: $email
        name: $name
        location: $location
        bio: $bio
      ) {
        id
        email
        name
        location
        bio
      }
    }
  `,
  VERIFY_USER: gql`
    mutation VerifyUser($token: String!) {
      verifyUser(token: $token) {
        loggedIn
      }
    }
  `,
  ADD_COMMENT: gql`
    mutation NewComment($body: String!, $author: ID!, $art: ID, $article: ID) {
      newComment(body: $body, author: $author, art: $art, article: $article) {
        id
        body
        art {
          title
        }
        author {
          name
          id
        }
      }
    }
  `,
  DELETE_COMMENT: gql`
    mutation DeleteComment($id: ID!) {
      deleteComment(_id: $id) {
        id
        body
      }
    }
  `,
  DELETE_ARTICLE: gql`
    mutation DeleteArticle($_id: ID!, $author: ID!) {
      deleteArticle(_id: $_id, author: $author) {
        id
        title
        body
      }
    }
  `,
  DELETE_ART: gql`
    mutation DeleteArt($_id: ID!) {
      deleteArt(_id: $_id) {
        id
        title
      }
    }
  `,
CREATE_VIDEO: gql`
    mutation newVideo(
      $category: ID!
      $author: ID!
      $title: String!
      $description: String!
      $videoLink: String!
    ) {
      newVideo(
        category: $category
        author: $author
        title: $title
        description: $description
        videoLink: $videoLink
      ) {
				id
        author {
          id
          name
          publishedArts {
            id
            title
            videoLink
            author {
              id
            }
          }
          likedArts {
            id
            title
            videoLink
          }
        }
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
  CREATE_ART: gql`
    mutation CreateArt(
      $category: ID!
      $author: ID!
      $title: String!
      $description: String!
      $photoLink: String!
    ) {
      newArt(
        category: $category
        author: $author
        title: $title
        description: $description
        photoLink: $photoLink
      ) {
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
  CREATE_ARTICLE: gql`
    mutation CreateArticle(
      $author: ID!
      $title: String!
      $body: String!
      $photoLink: String
      $header: String!
    ) {
      newArticle(
        author: $author
        title: $title
        body: $body
        photoLink: $photoLink
        header: $header
      ) {
        author {
          id
          name
        }
        header
        title
        body
        photoLink
      }
    }
  `,
  ADD_ARTICLE_LIKE: gql`
    mutation AddArticleLike($userId: ID!, $articleId: ID!) {
      addUserLikedArticle(userId: $userId, articleId: $articleId) {
        id
        name
        likedArticles {
          id
          title
          likers {
            id
            name
          }
        }
      }
    }
  `,
  ADD_ARTICLE_UNLIKE: gql`
    mutation userUnlikeArticle($userId: ID!, $articleId: ID!) {
      userUnlikeArticle(userId: $userId, articleId: $articleId) {
        id
        name
        likedArticles {
          id
          title
          likers {
            id
            name
          }
        }
      }
    }
  `,
  USER_LIKE_ART: gql`
    mutation addUserLikedArt($userId: ID!, $artId: ID!) {
      addUserLikedArt(userId: $userId, artId: $artId) {
        id
        name
        likedArts {
          id
          title
          likers {
            id
            name
          }
        }
      }
    }
  `,
  USER_UNLIKE_ART: gql`
    mutation userUnlikeArt($userId: ID!, $artId: ID!) {
      userUnlikeArt(userId: $userId, artId: $artId) {
        id
        name
        likedArts {
          id
          title
          likers {
            id
            name
          }
        }
      }
    }
  `,
  UPDATE_ARTICLE_TITLE: gql`
    mutation updateArticleTitle($id: ID!, $title: String!) {
      updateArticle(id: $id, title: $title) {
        id
        title
      }
    }
  `,
  UPDATE_ARTICLE_BODY: gql`
    mutation updateArticleBody($id: ID!, $body: String!) {
      updateArticle(id: $id, body: $body) {
        id
        body
      }
    }
  `,
  UPDATE_ARTICLE_HEADER: gql`
    mutation updateArticleHeader($id: ID!, $header: String!) {
      updateArticle(id: $id, header: $header) {
        id
        header
      }
    }
  `,
  UPDATE_ART_TITLE: gql`
    mutation updateArtTitle($id: ID!, $title: String!) {
      updateArt(id: $id, title: $title) {
        id
        title
      }
    }
  `,
  UPDATE_ART_DESCRIPTION: gql`
    mutation updateArtBody($id: ID!, $description: String!) {
      updateArt(id: $id, description: $description) {
        id
        description
      }
    }
	`,
	USER_UNLIKE_ART: gql`
    mutation userUnlikeArt($userId: ID!, $artId: ID!){
      userUnlikeArt(userId: $userId, artId: $artId) {
        id
        name
        likedArts {
          id
          title
          likers {
						id
						name
          }
        }
      }
    }
	`,
	// USER_PUBLISH_ART: gql`
	// 	mutation addPublishedArt($userId: ID!, $artId: ID!){
  //     addPublishedArt(userId: $userId, artId: $artId) {
	// 			id
  //       author {
  //         id
  //         name
  //         publishedArts {
  //           id
  //           title
  //           photoLink
  //           author {
  //             id
  //           }
  //         }
  //         likedArts {
  //           id
  //           title
  //           photoLink
  //         }
  //       }
  //       photoLink
  //       title
  //       description
  //       likers {
  //         id
	// 				name
  //       }
  //       category {
  //         id
  //         name
  //       }
  //       comments {
  //         body
  //         author {
  //           name
  //           id
  //         }
  //         id
  //       }
  //     }
  //   }
  // `,
	// ADD_ART_TO_CATEGORY: gql`
	// 	mutation addCategory($categoryId: ID!, $artId: ID!){
  //     addCategory(categoryId: $categoryId, artId: $artId) {
	// 			id
  //       author {
  //         id
  //         name
  //         publishedArts {
  //           id
  //           title
  //           photoLink
  //           author {
  //             id
  //           }
  //         }
  //       }
  //       photoLink
  //       title
  //       description
  //       likers {
  //         id
	// 				name
  //       }
  //       category {
  //         id
  //         name
	// 				arts {
	// 					id
	// 					title
	// 				}
  //       }
  //       comments {
  //         body
  //         author {
  //           name
  //           id
  //         }
  //         id
  //       }
  //     }
  //   }
  // `
};
