import React from 'react'
import styled from '../styled-components-config'

const ButtonContainer = styled.TouchableOpacity`
  padding: 10px;
  border-radius: 4px;
  background-color: #555;
`

const ButtonTitle = styled.Text`
  font-size: 16px;
  color: #fff;
`

interface ButtonProps {
  title: string
  onPress: () => void
}

const Button = ({ title, onPress }: ButtonProps) => (
  <ButtonContainer onPress={onPress}>
    <ButtonTitle>{title}</ButtonTitle>
  </ButtonContainer>
)

export default Button
