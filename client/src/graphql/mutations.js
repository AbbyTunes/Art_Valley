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
        token
        loggedIn
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
};
