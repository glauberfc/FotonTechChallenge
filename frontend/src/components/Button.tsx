import React from 'react'
import styled from '../styled-components-config'
import { ButtonProps } from 'react-native'

const ButtonContainer = styled.TouchableOpacity`
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  background-color: ${props => props.theme.primaryColor};
`

const ButtonTitle = styled.Text`
  text-align: center;
  font-size: ${props => props.theme.normalTextSize};
  color: #fff;
  font-weight: bold;
`

const Button = ({ title, ...props }: ButtonProps) => (
  <ButtonContainer {...props}>
    <ButtonTitle>{title}</ButtonTitle>
  </ButtonContainer>
)

export default Button
