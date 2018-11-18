import {
  createStackNavigator,
  NavigationScreenOptions,
  createBottomTabNavigator,
  createSwitchNavigator,
} from 'react-navigation'

import Login from '../screens/Login'
import SignUp from '../screens/SignUp'
import Home from '../screens/Home'
import Details from '../screens/Details'
import RegisterProduct from '../screens/RegisterProduct'
import AuthLoading from '../screens/AuthLoading'

const navigationOptions: NavigationScreenOptions = {
  headerStyle: {
    backgroundColor: '#f4511e',
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
  },
  {
    initialRouteName: 'Home',
    navigationOptions,
  }
)

const AppTab = createBottomTabNavigator(
  {
    HomeStack,
    RegisterProduct,
  },
  {
    initialRouteName: 'HomeStack',
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
    AppTab,
    AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
)
