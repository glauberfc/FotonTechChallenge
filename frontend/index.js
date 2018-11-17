import React from 'react'
import { AppRegistry, AsyncStorage } from 'react-native'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'

import App from './src/components/App'
import { name as appName } from './app.json'
import { ThemeProvider } from './src/styled-components-config'
import { theme } from './src/theme'

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

const Root = () => (
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </ApolloProvider>
)

AppRegistry.registerComponent(appName, () => Root)
