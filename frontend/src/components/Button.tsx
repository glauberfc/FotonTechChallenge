import React from 'react'
import styled from '../styled-components-config'
import { ButtonProps } from 'react-native'

const ButtonContainer = styled.TouchableOpacity`
  padding: 10px;
  border-radius: 4px;
  background-color: ${props => props.theme.primaryColor};
`

const ButtonTitle = styled.Text`
  text-align: center;
  font-size: 16px;
  color: #fff;
`

const Button = ({ title, ...props }: ButtonProps) => (
  <ButtonContainer {...props}>
    <ButtonTitle>{title}</ButtonTitle>
  </ButtonContainer>
)

export default Button
