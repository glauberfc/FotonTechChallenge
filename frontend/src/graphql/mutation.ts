import gql from 'graphql-tag'

export const signUpMutation = gql`
  mutation SignUpMutation($name: String!, $email: String!, $password: String!) {
    signUp(name: $name, email: $email, password: $password) {
      token
      user {
        id
        name
      }
    }
  }
`

export const loginMutation = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
      }
    }
  }
`

export const addProductMutation = gql`
  mutation AddProductMutation(
    $name: String!
    $description: String!
    $quantity: Int!
    $price: Float!
    $provider: String!
  ) {
    addProduct(
      name: $name
      description: $description
      quantity: $quantity
      price: $price
      provider: $provider
    ) {
      name
      description
      quantity
      price
      provider
    }
  }
`
