import * as React from 'react'
import { TextInput, View, Text, Button as NativeButtton } from 'react-native'
import { Formik, FormikProps } from 'formik'
import * as Yup from 'yup'
import { NavigationScreenProps } from 'react-navigation'

import Button from '../components/Button'
import { graphql } from 'react-apollo'
import { signUpMutation } from '../graphql/mutation'
import { showMessage } from 'react-native-flash-message'
import { signIn } from '../utils'

const signUpSchema = Yup.object().shape({
  name: Yup.string().required('Campo obrigatório'),
  email: Yup.string()
    .email('E-mail inválido')
    .required('Campo obrigatório'),
  password: Yup.string()
    .min(2, 'A senha deve conter no mínmo 3 caracteres')
    .required('Campo obrigatório'),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password')], 'As senhas devem ser iguais')
    .required('Campo obrigatório'),
})

interface Values {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

interface Props {
  signUp: (name: string, email: string, password: string) => Promise<void>
}

const SignUp: React.SFC<
  FormikProps<Values> & NavigationScreenProps & Props
> = ({ signUp, navigation }) => (
  <Formik
    initialValues={{
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    }}
    onSubmit={async (values, actions) => {
      const { name, email, password } = values

      try {
        const result = (await signUp(name, email, password)) as any
        // Reset Form
        actions.resetForm()
        await signIn(result.data.signUp.token)
        navigation.navigate('AppStack')
      } catch (error) {
        // If erros send error feedback
        showMessage({
          message: 'Ops! Não foi possível cadastrar o usuário',
          description: error.graphQLErrors
            ? error.graphQLErrors[0].message
            : 'Verifique se você forneceu todas as informações corretamente ou tente novamente mais tarde.',
          type: 'danger',
        })
      }
    }}
    validationSchema={signUpSchema}
  >
    {props => (
      <View style={{ flex: 1 }}>
        <TextInput
          autoFocus
          onChangeText={props.handleChange('name')}
          onBlur={() => {
            props.handleBlur('name')
          }}
          value={props.values.name}
          placeholder="Nome"
        />
        <Text>{props.errors.name}</Text>

        <TextInput
          onChangeText={props.handleChange('email')}
          onBlur={() => {
            props.handleBlur('email')
          }}
          value={props.values.email}
          keyboardType="email-address"
          placeholder="E-mail"
          autoCapitalize="none"
        />
        <Text>{props.errors.email}</Text>

        <TextInput
          onChangeText={props.handleChange('password')}
          onBlur={() => {
            props.handleBlur('password')
          }}
          value={props.values.password}
          secureTextEntry
          placeholder="Senha"
        />
        <Text>{props.errors.password}</Text>

        <TextInput
          onChangeText={props.handleChange('passwordConfirmation')}
          onBlur={() => {
            props.handleBlur('passwordConfirmation')
          }}
          value={props.values.passwordConfirmation}
          secureTextEntry
          placeholder="Confirmação de senha"
        />
        <Text>{props.errors.passwordConfirmation}</Text>

        <Button onPress={() => props.handleSubmit()} title="Submit" />
        <NativeButtton
          onPress={() => navigation.navigate('Login')}
          title="Login"
        />
      </View>
    )}
  </Formik>
)

SignUp.navigationOptions = {
  title: 'SignUp',
}

export default graphql(signUpMutation, {
  props: ({ mutate }) => ({
    signUp: (name: string, email: string, password: string) =>
      mutate({ variables: { name, email, password } }),
  }),
})(SignUp)
