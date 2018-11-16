import * as React from 'react'
import { TextInput, View } from 'react-native'
import { Formik, FormikProps } from 'formik'
import * as Yup from 'yup'
import { NavigationScreenProps } from 'react-navigation'

import Button from '../components/Button'

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

const Login: React.SFC<FormikProps<Values> & NavigationScreenProps> = props => (
  <Formik
    initialValues={{ email: '', password: '' }}
    onSubmit={values => console.log(values)}
    validationSchema={loginSchema}
  >
    {props => (
      <View style={{ flex: 1 }}>
        <TextInput
          onChangeText={props.handleChange('email')}
          onBlur={() => {
            props.handleBlur('email')
          }}
          value={props.values.email}
          keyboardType="email-address"
          placeholder="E-mail"
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

        <Button
          onPress={() => {
            props.handleSubmit
          }}
          title="Submit"
        />
      </View>
    )}
  </Formik>
)

Login.navigationOptions = {
  title: 'Login',
}

export default Login
