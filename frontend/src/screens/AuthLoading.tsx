import * as React from 'react'

import { getToken } from '../utils'
import { View, ActivityIndicator, StatusBar } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'

class AuthLoading extends React.Component<NavigationScreenProps> {
  constructor(props) {
    super(props)
    this._bootstrapAsync()
  }

  async _bootstrapAsync() {
    const token = await getToken()

    this.props.navigation.navigate(token ? 'HomeStack' : 'AuthStack')
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
