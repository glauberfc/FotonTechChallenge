import * as React from 'react'
import { TextInput, View } from 'react-native'
import { Formik, FormikProps } from 'formik'
import * as Yup from 'yup'
import { NavigationScreenProps } from 'react-navigation'

import Button from '../components/Button'
import { graphql } from 'react-apollo'
import { loginMutation } from '../graphql/mutation'

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('E-mail inválido')
    .required('Campo obrigatório'),
  password: Yup.string().min(2, 'A senha deve conter no mínmo 3 caracteres'),
})

interface Values {
  email: string
  password: string
}

interface Props {
  login: (email: string, password: string) => Promise<void>
  changeLoginState: (loggedIn: boolean, token: string) => void
}

const Login: React.SFC<
  FormikProps<Values> & NavigationScreenProps & Props
> = props => (
  <Formik
    initialValues={{ email: '', password: '' }}
    onSubmit={async values => {
      const { email, password } = values
      const result = (await props.login(email, password)) as any
      // Update login state to true
      props.changeLoginState(true, result.data.signUp.token)
    }}
    validationSchema={loginSchema}
  >
    {props => (
      <View style={{ flex: 1 }}>
        <TextInput
          onChangeText={props.handleChange('email')}
          onBlur={() => {
            props.handleBlur('email')
          }}
          autoFocus
          value={props.values.email}
          keyboardType="email-address"
          placeholder="E-mail"
          autoCapitalize="none"
        />

        <TextInput
          onChangeText={props.handleChange('password')}
          onBlur={() => {
            props.handleBlur('password')
          }}
          value={props.values.password}
          secureTextEntry
          placeholder="Senha"
        />

        <Button onPress={() => props.handleSubmit()} title="Submit" />
      </View>
    )}
  </Formik>
)

Login.navigationOptions = {
  title: 'Login',
}

export default graphql(loginMutation, {
  props: ({ mutate }) => ({
    login: (email: string, password: string) =>
      mutate({ variables: { email, password } }),
  }),
})(Login)
