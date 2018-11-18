import * as React from 'react'
import { Button as NativeButtton } from 'react-native'
import { Formik, FormikProps, Field } from 'formik'
import * as Yup from 'yup'
import { NavigationScreenProps } from 'react-navigation'
import { showMessage } from 'react-native-flash-message'

import Button from '../components/Button'
import { graphql } from 'react-apollo'
import { loginMutation } from '../graphql/mutation'
import { signIn } from '../utils'
import InputField from '../components/InputField'
import styled from '../styled-components-config'

const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 18px 18px 0;
  background-color: #fff;
`

const Title = styled.Text`
margin-bottom: 18px;
  font-size: ${props => props.theme.largeTextSize}
  color: ${props => props.theme.darkColor}
  text-align: center;
  font-weight: bold;
`

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('E-mail inválido')
    .required('Campo obrigatório'),
  password: Yup.string()
    .min(3, 'A senha deve conter no mínmo 3 caracteres')
    .required('Campo obrigatório'),
})

interface Values {
  email: string
  password: string
}

interface Props {
  login: (email: string, password: string) => Promise<void>
  changeLoginState: (loggedIn: boolean, token: string) => void
}

const Login: React.SFC<FormikProps<Values> & NavigationScreenProps & Props> = ({
  login,
  navigation,
}) => (
  <Formik
    initialValues={{ email: '', password: '' }}
    onSubmit={async (values, actions) => {
      const { email, password } = values

      try {
        const result = (await login(email, password)) as any

        await signIn(result.data.login.token)
        navigation.navigate('HomeStack')
      } catch (error) {
        // If erros send error feedback
        showMessage({
          message: 'Ops! Não foi possível efetuar o login',
          description: error.graphQLErrors
            ? error.graphQLErrors[0].message
            : 'Verifique se você forneceu todas as informações corretamente ou tente novamente mais tarde.',
          type: 'danger',
        })
      }
    }}
    validationSchema={loginSchema}
  >
    {props => (
      <Container>
        <Title>Foton Store</Title>

        <Field
          name="email"
          placeholder="E-mail"
          component={InputField}
          autoFocus
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Field
          name="password"
          component={InputField}
          placeholder="Senha"
          secureTextEntry
        />

        <Button onPress={props.handleSubmit} title="Logar" />
        <NativeButtton
          onPress={() => navigation.navigate('SignUp')}
          title="Cadastre-se"
        />
      </Container>
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
})(Login as any)
