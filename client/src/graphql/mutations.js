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
  CREATE_ART: gql`
    mutation CreateArt($category: ID!, $authorId: ID!, $title: String!, $description: String!, $photoLink: String!) {
      newArt(category: $category, authorId: $authorId, title: $title, description: $description, photoLink: $photoLink) {
          category {
            id
            name
          }
          authorId
          title
          description
          photoLink
      }
      
    }
  `
};
