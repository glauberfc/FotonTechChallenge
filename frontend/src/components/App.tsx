import * as React from 'react'
import { ApolloConsumerProps } from 'react-apollo'
import AwesomeAlert from 'react-native-awesome-alerts'
import { withTheme } from 'styled-components'

import { getToken, signIn, signOut } from '../utils'
import { RootStack, AuthStack } from './Navigation'
import { View } from 'react-native'
import { ThemeInterface } from '../theme'

const initialState = {
  showAlert: false,
  showProgress: true,
  alertTitle: 'Salvando...',
  alertMessage: '',
  loggedIn: false,
}

interface Props {
  theme: ThemeInterface
}
interface State {
  showAlert: boolean
  showProgress: boolean
  alertTitle: string
  alertMessage: string
  loggedIn: boolean
}
class App extends React.Component<ApolloConsumerProps & Props, State> {
  state = initialState

  async componentWillMount() {
    const token = await getToken()
    if (token) {
      this.setState({ loggedIn: true })
    }
  }

  changeLoginState = (loggedIn: boolean, token: string) => {
    this.setState({ loggedIn })
    if (loggedIn) {
      signIn(token)
    } else {
      signOut()
    }
  }

  updateAlertMessage = (args: State) => {
    this.setState({ ...args })
  }

  toggleAlert = () => {
    this.setState(prev => ({
      showAlert: !prev.showAlert,
    }))
  }

  render() {
    const { theme } = this.props
    const { showAlert, showProgress, alertTitle, alertMessage } = this.state

    return (
      <View style={{ flex: 1 }}>
        {this.state.loggedIn ? (
          <RootStack
            screenProps={{
              changeLoginState: this.changeLoginState,
              toggleAlert: this.toggleAlert,
              updateAlertMessage: this.updateAlertMessage,
            }}
          />
        ) : (
          <AuthStack
            screenProps={{
              changeLoginState: this.changeLoginState,
              updateAlertMessage: this.updateAlertMessage,
            }}
          />
        )}

        <AwesomeAlert
          show={showAlert}
          showProgress={showProgress}
          title={alertTitle}
          message={alertMessage}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          cancelText="Fechar"
          cancelButtonColor={theme.primaryColor}
          onCancelPressed={() => {
            this.toggleAlert()
          }}
        />
      </View>
    )
  }
}

export default withTheme(App)
