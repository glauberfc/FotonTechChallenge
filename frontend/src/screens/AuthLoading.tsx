import * as React from 'react'

import { getToken } from '../utils'
import { View, ActivityIndicator, StatusBar } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'

const initialState = {
  showAlert: false,
  showProgress: true,
  alertTitle: 'Salvando...',
  alertMessage: '',
  loggedIn: false,
}

class AuthLoading extends React.Component<NavigationScreenProps, State> {
  state = initialState

  constructor(props) {
    super(props)
    this._bootstrapAsync()
  }

  async _bootstrapAsync() {
    const token = await getToken()

    this.props.navigation.navigate(token ? 'AppTab' : 'AuthStack')
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    )
  }
}

export default AuthLoading
