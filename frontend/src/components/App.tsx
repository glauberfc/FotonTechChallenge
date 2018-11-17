import * as React from 'react'
// import { ApolloClient } from 'apollo-client'
// import { InMemoryCache } from 'apollo-cache-inmemory'
// import { HttpLink } from 'apollo-link-http'
// import { setContext } from 'apollo-link-context'
import { ApolloProvider } from 'react-apollo'
import { createStackNavigator } from 'react-navigation'
import ApolloClient from 'apollo-boost'

// import Login from '../screens/Login'
import SignUp from '../screens/SignUp'
import Home from '../screens/Home'
import Details from '../screens/Details'
import Create from '../screens/Create'
import { getToken, signIn, signOut } from '../utils'
import { View, Text, AsyncStorage } from 'react-native'

const RootStack = createStackNavigator(
  {
    Home,
    Details,
    Create,
  },
  {
    initialRouteName: 'Create',
  }
)

const AuthStack = createStackNavigator(
  {
    // Login,
    SignUp,
    RootStack,
  },
  {
    initialRouteName: 'SignUp',
  }
)

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

// export default () => (
//   <ApolloProvider client={client}>
//     <RootStack />
//   </ApolloProvider>
// )

class App extends React.Component {
  state = { loggedIn: false }

  async componentWillMount() {
    const token = await getToken()
    if (token) {
      this.setState({ loggedIn: true })
    }
  }

  handleChangeLoginState = (loggedIn: boolean = false, token: string) => {
    this.setState({ loggedIn })
    if (loggedIn) {
      signIn(token)
    } else {
      signOut()
    }
  }

  render() {
    return (
      <ApolloProvider client={client}>
        {this.state.loggedIn ? (
          <RootStack />
        ) : (
          <AuthStack changeLoginState={() => this.handleChangeLoginState} />
        )}
      </ApolloProvider>
    )
  }
}

export default App
