import React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { createStackNavigator } from 'react-navigation'

import Login from '../screens/Login'
import Home from '../screens/Home'
import Details from '../screens/Details'

const RootStack = createStackNavigator(
  {
    Login,
    Home,
    Details,
  },
  {
    initialRouteName: 'Login',
  }
)

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
})

export default () => (
  <ApolloProvider client={client}>
    <RootStack />
  </ApolloProvider>
)
