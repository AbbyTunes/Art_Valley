import gql from "graphql-tag";

export default {
  REGISTER_USER: gql`
    mutation RegisterUser($name: String!, $email: String!, $password: String!) {
      register(name: $name, email: $email, password: $password) {
        name
        email
        loggedIn
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
  VERIFY_USER: gql`
    mutation VerifyUser($token: String!) {
      verifyUser(token: $token) {
				loggedIn
      }
    }
  `,
  ADD_COMMENT: gql`
    mutation NewComment($body: String!, $author: ID!, $art: ID!) {
      newComment(body: $body, author: $author, art: $art){
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

  // CREATE_PRODUCT: gql`
  //   mutation CreateProduct(
  //     $name: String!
  //     $description: String!
  //     $weight: Float!
  //   ) {
  //     newProduct(name: $name, description: $description, weight: $weight) {
  //       id
  //       name
  //       description
  //       weight
  //     }
  //   }
  // `
  CREATE_ART: gql`
    mutation CreateArt($category: ID!, $author: ID!, $title: String!, $description: String!, $photoLink: String!) {
      newArt(category: $category, author: $author, title: $title, description: $description, photoLink: $photoLink) {
          category {
            id
            name
          }
          author {
            id
            name
          }
          title
          description
          photoLink
      }
      
    }
  `
};
