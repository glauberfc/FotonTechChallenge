import * as React from 'react'
import { Query } from 'react-apollo'
import { NavigationScreenProps } from 'react-navigation'

import styled from '../styled-components-config'
import { productQuery } from '../graphql/queries'
import {
  ProductQuery,
  ProductQueryVariables,
} from '../graphql/types/ProductQuery'

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
  const productName = props.navigation.getParam('productName', 'MacBook Pro 13')

  return (
    <Query<ProductQuery, ProductQueryVariables>
      query={productQuery}
      variables={{ name: productName }}
    >
      {({ loading, error, data: { product } }) => {
        if (loading) return null
        if (error) return `Error!: ${error}`

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
      }}
    </Query>
  )
}

Details.navigationOptions = {
  title: 'Detalhes do produto',
}

export default Details
