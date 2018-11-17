import { createStackNavigator, NavigationScreenOptions } from 'react-navigation'

import Login from '../screens/Login'
import SignUp from '../screens/SignUp'
import Home from '../screens/Home'
import Details from '../screens/Details'
import Create from '../screens/RegisterProduct'

const navigationOptions: NavigationScreenOptions = {
  headerStyle: {
    backgroundColor: '#f4511e',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
}

export const RootStack = createStackNavigator(
  {
    Home,
    Details,
    Create,
  },
  {
    initialRouteName: 'Create',
    navigationOptions,
  }
)

export const AuthStack = createStackNavigator(
  {
    Login,
    SignUp,
    RootStack,
  },
  {
    initialRouteName: 'SignUp',
    navigationOptions,
  }
)
