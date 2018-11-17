import * as React from 'react'
import { TextInput, View, Text } from 'react-native'
import { Formik, FormikProps } from 'formik'
import * as Yup from 'yup'
import { NavigationScreenProps } from 'react-navigation'

import Button from '../components/Button'
import { graphql } from 'react-apollo'
import { signUpMutation } from '../graphql/mutation'

const signUpSchema = Yup.object().shape({
  name: Yup.string().required('Campo obrigatório'),
  email: Yup.string()
    .email('E-mail inválido')
    .required('Campo obrigatório'),
  password: Yup.string()
    .min(2, 'A senha deve conter no mínmo 3 caracteres')
    .required('Campo obrigatório'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'As senhas devem ser iguais')
    .required('Campo obrigatório'),
})

interface Values {
  name: string
  email: string
  password: string
  confirmPassword: string
}

interface Props {
  signUp: (name: string, email: string, password: string) => Promise<void>
  changeLoginState: (loggedIn: boolean, token: string) => void
}

const SignUp: React.SFC<
  FormikProps<Values> & NavigationScreenProps & Props
> = props => (
  <Formik
    initialValues={{ name: 'Glauber', email: 'g@mail.com', password: '123' }}
    onSubmit={async values => {
      const { name, email, password } = values
      const result = (await props.signUp(name, email, password)) as any
      // Update login state to true
      props.changeLoginState(true, result.data.signUp.token)
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
          onChangeText={props.handleChange('confirmPassword')}
          onBlur={() => {
            props.handleBlur('confirmPassword')
          }}
          value={props.values.confirmPassword}
          secureTextEntry
          placeholder="Confirmação de senha"
        />
        <Text>{props.errors.confirmPassword}</Text>

        <Button onPress={() => props.handleSubmit()} title="Submit" />
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
