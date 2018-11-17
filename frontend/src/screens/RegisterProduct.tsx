import * as React from 'react'
import { TextInput, View, Text } from 'react-native'
import { Formik, FormikProps } from 'formik'
import * as Yup from 'yup'
import { NavigationScreenProps } from 'react-navigation'

import Button from '../components/Button'
import { graphql } from 'react-apollo'
import { signUpMutation, addProductMutation } from '../graphql/mutation'

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
}

const Create: React.SFC<
  FormikProps<Values> & NavigationScreenProps & Props
> = props => (
  <Formik
    initialValues={{
      name: '',
      description: '',
      quantity: '0',
      price: '0',
      provider: '',
    }}
    onSubmit={async values => {
      const { name, description, quantity, price, provider } = values
      // Convert quantity and price
      const quantityConverted = parseInt(quantity)
      const priceConverted = parseFloat(price)

      // Salve product
      const result = (await props.addProduct(
        name,
        description,
        quantityConverted,
        priceConverted,
        provider
      )) as any
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

Create.navigationOptions = {
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
})(Create)
