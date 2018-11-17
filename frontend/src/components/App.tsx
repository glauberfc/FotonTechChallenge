import * as React from 'react'
import { ApolloConsumerProps } from 'react-apollo'

import { getToken, signIn, signOut } from '../utils'
import { RootStack, AuthStack } from './Navigation'

class App extends React.Component<ApolloConsumerProps> {
  state = { loggedIn: false }

  async componentWillMount() {
    const token = await getToken()
    if (token) {
      this.setState({ loggedIn: true })
    }
  }

  handleChangeLoginState = (loggedIn: boolean, token: string) => {
    this.setState({ loggedIn })
    if (loggedIn) {
      signIn(token)
    } else {
      signOut()
    }
  }

  render() {
    return this.state.loggedIn ? (
      <RootStack />
    ) : (
      <AuthStack changeLoginState={() => this.handleChangeLoginState} />
    )
  }
}

export default App
