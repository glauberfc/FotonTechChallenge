import * as React from 'react'
import { View } from 'react-native'
import { Formik, FormikProps, Field } from 'formik'
import * as Yup from 'yup'
import { NavigationScreenProps } from 'react-navigation'

import Button from '../components/Button'
import { graphql } from 'react-apollo'
import { addProductMutation } from '../graphql/mutation'
import { ThemeInterface } from '../theme'
import { withTheme } from 'styled-components'
import { showMessage } from 'react-native-flash-message'
import InputField from '../components/InputField'

const signUpSchema = Yup.object().shape({
  name: Yup.string().required('Campo obrigatório'),
  description: Yup.string().required('Campo obrigatório'),
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
          showMessage({
            message: 'Ops! Não foi possível salvar o produto',
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
            name="description"
            placeholder="Descrição"
            component={InputField}
          />

          <Field
            name="quantity"
            placeholder="Quantidade em estoque"
            component={InputField}
            keyboardType="numeric"
          />

          <Field
            name="price"
            placeholder="Preço"
            component={InputField}
            keyboardType="numeric"
          />

          <Field
            name="provider"
            placeholder="Fornecedor"
            component={InputField}
          />

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
