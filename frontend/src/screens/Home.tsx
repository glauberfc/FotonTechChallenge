import * as React from 'react'
import { FlatList, ButtonProps, View, Text } from 'react-native'
import { Query } from 'react-apollo'
import { NavigationScreenProps } from 'react-navigation'

import styled from '../styled-components-config'
import { productsQuery } from '../graphql/queries'
import { ProductsQuery } from '../graphql/types/ProductsQuery'
import Button from '../components/Button'

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
        if (loading) {
          return (
            <View>
              <Text>Loading...</Text>
            </View>
          )
        }

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
                        productName: item.name,
                      })
                    }}
                  />
                </Card>
              )}
            />
          </Container>
        )
      }}
    </Query>
  )
}

Home.navigationOptions = {
  title: 'Produtos',
  headerBackTitle: null,
}

export default Home
