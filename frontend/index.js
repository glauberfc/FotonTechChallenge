import React from 'react'
import { AppRegistry, AsyncStorage } from 'react-native'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'

import { name as appName } from './app.json'
import { ThemeProvider } from './src/styled-components-config'
import { theme } from './src/theme'
import Navigation from './src/components/Navigation'
import FlashMessage from 'react-native-flash-message'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  fetchOptions: {
    credentials: 'include',
  },
  request: async operation => {
    const token = await AsyncStorage.getItem('token')
    operation.setContext({
      headers: {
        token,
      },
    })
  },
})

const App = () => (
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <Navigation />
        <FlashMessage position="top" />
      </React.Fragment>
    </ThemeProvider>
  </ApolloProvider>
)

AppRegistry.registerComponent(appName, () => App)
