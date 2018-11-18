import * as React from 'react'
import { FlatList, Button as NativeButton, View, Text } from 'react-native'
import { Query } from 'react-apollo'
import { NavigationScreenProps } from 'react-navigation'

import styled from '../styled-components-config'
import { productsQuery } from '../graphql/queries'
import {
  ProductsQuery,
  ProductsQuery_products,
} from '../graphql/types/ProductsQuery'
import Button from '../components/Button'
import { signOut } from '../utils'

const Container = styled.View`
  display: flex;
  justify-content: center;
`

const Title = styled.Text`
  margin: 12px;
  font-size: 16px;
  color: #333;
`

const Card = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 4px 12px;
  padding: 16px;
  border-radius: 4px;
  background-color: #fff;
`

const Info = styled.View``

const PersonName = styled.Text`
  margin-bottom: 4px;
  font-size: 18px;
  font-weight: bold;
  color: #555;
`

const PersonBirthYear = styled.Text`
  font-size: 16px;
  color: #555;
`

const Home: React.SFC<NavigationScreenProps> = props => {
  const { navigation } = props

  return (
    <Query<ProductsQuery> query={productsQuery}>
      {({ loading, error, data }) => {
        let products: ProductsQuery_products[] | null = []

        if (loading) {
          return (
            <View>
              <Text>Loading...</Text>
            </View>
          )
        }

        if (error)
          return (
            <View>
              <Text>{`${error}`}</Text>
            </View>
          )

        if (data && data.products) {
          products = data.products

          return (
            <Container>
              <Title>Produtos</Title>

              <FlatList
                data={data.products}
                keyExtractor={(item, i) => i.toString()}
                renderItem={({ item, index }) => (
                  <Card>
                    <Info>
                      <PersonName>{item.name}</PersonName>
                    </Info>

                    <Button
                      title="Ver detalhes"
                      onPress={() => {
                        navigation.push('Details', {
                          productId: item.id,
                        })
                      }}
                    />
                  </Card>
                )}
              />
            </Container>
          )
        }
      }}
    </Query>
  )
}

Home.navigationOptions = ({ navigation }) => ({
  title: 'Foton Store',
  headerBackTitle: null,
  headerRight: (
    <NativeButton
      onPress={() => {
        signOut()
        navigation.navigate('AuthStack')
      }}
      title="Sair"
      color="#fff"
    />
  ),
})

export default Home
