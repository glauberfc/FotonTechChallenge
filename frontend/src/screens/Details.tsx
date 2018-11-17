import * as React from 'react'
import { Query } from 'react-apollo'
import { NavigationScreenProps } from 'react-navigation'

import styled from '../styled-components-config'
import { productQuery } from '../graphql/queries'
import {
  ProductQuery,
  ProductQueryVariables,
  ProductQuery_product,
} from '../graphql/types/ProductQuery'
import { View, Text } from 'react-native'

const Container = styled.View`
  flex: 1;
  padding: 24px 24px 0;
  background-color: #fff;
`

const Label = styled.Text`
  font-size: 16px;
  color: #555;
`

const Title = styled.Text`
  margin-bottom: 16px;
  font-size: 18px;
  font-weight: bold;
  color: #333;
`

const Details: React.SFC<NavigationScreenProps> = props => {
  const productId = props.navigation.getParam('productId', '')

  return (
    <Query<ProductQuery, ProductQueryVariables>
      query={productQuery}
      variables={{ id: productId }}
    >
      {({ loading, error, data }) => {
        let product: ProductQuery_product | null = null

        if (loading) return null
        if (error)
          return (
            <View>
              <Text>{`Erro: ${error}`}</Text>
            </View>
          )

        if (data && data.product) {
          product = data.product

          return (
            <Container>
              <Label>Nome:</Label>
              <Title>{product.name}</Title>
              <Label>Descrição:</Label>
              <Title>{product.description}</Title>
              <Label>Quantidade:</Label>
              <Title>{product.quantity}</Title>
              <Label>Preço:</Label>
              <Title>{product.price}</Title>
              <Label>Fornecedor:</Label>
              <Title>{product.provider}</Title>
            </Container>
          )
        }
      }}
    </Query>
  )
}

Details.navigationOptions = {
  title: 'Detalhes do produto',
}

export default Details
