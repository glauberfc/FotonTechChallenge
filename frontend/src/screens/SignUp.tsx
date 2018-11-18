import * as React from 'react'
import { View, Text, Button as NativeButtton } from 'react-native'
import { Formik, FormikProps, Field } from 'formik'
import * as Yup from 'yup'
import { NavigationScreenProps } from 'react-navigation'

import Button from '../components/Button'
import { graphql } from 'react-apollo'
import { signUpMutation } from '../graphql/mutation'
import { showMessage } from 'react-native-flash-message'
import { signIn } from '../utils'
import InputField from '../components/InputField'

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
        navigation.navigate('AppTab')
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
        <Field
          name="name"
          placeholder="Nome"
          component={InputField}
          autoFocus
        />

        <Field
          name="email"
          placeholder="E-mail"
          component={InputField}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Field
          name="password"
          component={InputField}
          placeholder="Senha"
          secureTextEntry
        />

        <Field
          name="passwordConfirmation"
          placeholder="Confirmação de senha"
          component={InputField}
          secureTextEntry
        />

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
