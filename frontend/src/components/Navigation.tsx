import {
  createStackNavigator,
  NavigationScreenOptions,
  createSwitchNavigator,
} from 'react-navigation'

import Login from '../screens/Login'
import SignUp from '../screens/SignUp'
import Home from '../screens/Home'
import Details from '../screens/Details'
import AuthLoading from '../screens/AuthLoading'
import RegisterProduct from '../screens/RegisterProduct'
import { theme } from '../theme'

const navigationOptions: NavigationScreenOptions = {
  headerStyle: {
    backgroundColor: theme.primaryColor,
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
}

const HomeStack = createStackNavigator(
  {
    Home,
    Details,
    RegisterProduct,
  },
  {
    initialRouteName: 'Home',
    navigationOptions,
  }
)

const AuthStack = createStackNavigator(
  {
    Login,
    SignUp,
  },
  {
    initialRouteName: 'Login',
    navigationOptions,
  }
)

export default createSwitchNavigator(
  {
    AuthLoading,
    HomeStack,
    AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
)
