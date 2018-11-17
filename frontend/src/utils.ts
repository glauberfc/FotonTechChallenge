import { AsyncStorage } from 'react-native'

const AUTH_TOKEN = 'token'

let token: string = ''

export const getToken = async () => {
  if (token) {
    return Promise.resolve(token)
  }

  token = (await AsyncStorage.getItem(AUTH_TOKEN)) as any
  return token
}

export const signIn = (newToken: string) => {
  token = newToken
  return AsyncStorage.setItem(AUTH_TOKEN, newToken)
}

export const signOut = () => {
  token = ''
  return AsyncStorage.removeItem(AUTH_TOKEN)
}
