import * as React from 'react'
import { TextInput, View, Text } from 'react-native'
import { Formik, FormikProps } from 'formik'
import * as Yup from 'yup'
import { NavigationScreenProps } from 'react-navigation'
// import AwesomeAlert from 'react-native-awesome-alerts'

import Button from '../components/Button'
import { graphql } from 'react-apollo'
import { addProductMutation } from '../graphql/mutation'
import { ThemeInterface } from '../theme'
import { withTheme } from 'styled-components'

const signUpSchema = Yup.object().shape({
  name: Yup.string().required('Campo obrigatório'),
  description: Yup.string().required('Campo obrigatório'),
  // 'Informe um valor numérico'
  quantity: Yup.number().required('Campo obrigatório'),
  price: Yup.number().required('Campo obrigatório'),
  provider: Yup.string().required('Campo obrigatório'),
})

interface Values {
  name: string
  description: string
  quantity: string
  price: string
  provider: string
}

interface Props {
  addProduct: (
    name: string,
    description: string,
    quantity: number,
    price: number,
    provider: string
  ) => Promise<void>
  theme: ThemeInterface
}

const RegisterProduct: React.SFC<
  FormikProps<Values> & NavigationScreenProps & Props
> = props => {
  const { addProduct, screenProps } = props

  return (
    <Formik
      initialValues={{
        name: '',
        description: '',
        quantity: '0',
        price: '0',
        provider: '',
      }}
      onSubmit={async (values, actions) => {
        screenProps && screenProps.toggleAlert()

        const { name, description, quantity, price, provider } = values
        // Convert quantity and price
        const quantityConverted = parseInt(quantity)
        const priceConverted = parseFloat(price)

        // Try salve product
        try {
          await addProduct(
            name,
            description,
            quantityConverted,
            priceConverted,
            provider
          )
          // If no erros send success feedback
          screenProps &&
            screenProps.updateAlertMessage({
              showAlert: true,
              showProgress: false,
              alertTitle: 'Produto salvo com sucesso!',
              alertMessage:
                'O produto foi cadastrado corretamente. Você pode voltar e ver produto na lista.',
            })
          // Reset Form
          actions.resetForm()
        } catch (error) {
          // If erros send error feedback
          screenProps &&
            screenProps.updateAlertMessage({
              showAlert: true,
              showProgress: false,
              alertTitle: 'Ops! Não foi possível salvar o produto',
              alertMessage:
                'Verifique se você forneceu todas as informações corretamente ou tente novamente mais tarde.',
            })
        }
      }}
      validationSchema={signUpSchema}
    >
      {props => (
        <View style={{ flex: 1 }}>
          <TextInput
            onChangeText={props.handleChange('name')}
            onBlur={() => {
              props.handleBlur('name')
            }}
            autoFocus
            value={props.values.name}
            placeholder="Nome"
          />
          <Text>{props.errors.name}</Text>

          <TextInput
            onChangeText={props.handleChange('description')}
            onBlur={() => {
              props.handleBlur('description')
            }}
            value={props.values.description}
            placeholder="Descrição"
          />
          <Text>{props.errors.description}</Text>

          <TextInput
            onChangeText={props.handleChange('quantity')}
            onBlur={() => {
              props.handleBlur('quantity')
            }}
            keyboardType="numeric"
            value={props.values.quantity}
            placeholder="Quantidade em estoque"
          />
          <Text>{props.errors.quantity}</Text>

          <TextInput
            onChangeText={props.handleChange('price')}
            onBlur={() => {
              props.handleBlur('price')
            }}
            keyboardType="numeric"
            value={props.values.price}
            placeholder="Preço"
          />
          <Text>{props.errors.price}</Text>

          <TextInput
            onChangeText={props.handleChange('provider')}
            onBlur={() => {
              props.handleBlur('provider')
            }}
            value={props.values.provider}
            placeholder="Fornecedor"
          />
          <Text>{props.errors.provider}</Text>

          <Button onPress={() => props.handleSubmit()} title="Salvar" />
        </View>
      )}
    </Formik>
  )
}

RegisterProduct.navigationOptions = {
  title: 'Cadastrar produto',
}

export default graphql(addProductMutation, {
  props: ({ mutate }) => ({
    addProduct: (
      name: string,
      description: string,
      quantity: number,
      price: number,
      provider: string
    ) =>
      mutate({ variables: { name, description, quantity, price, provider } }),
  }),
})(withTheme(RegisterProduct) as any)
