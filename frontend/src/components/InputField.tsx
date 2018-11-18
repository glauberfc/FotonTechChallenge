import * as React from 'react'
import styled from '../styled-components-config'
import { View, TextInput } from 'react-native'
import { TextInputMask } from 'react-native-masked-text'

const Input = styled(TextInput)`
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  border: 1px solid ${props => props.theme.grayColor};
  font-size: ${props => props.theme.normalTextSize};
  color: ${props => props.theme.darkColor};
`

const MaskedInput = styled(TextInputMask)`
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  border: 1px solid ${props => props.theme.grayColor};
  font-size: ${props => props.theme.normalTextSize};
  color: ${props => props.theme.darkColor};
`

const ErrorMessage = styled.Text`
  margin-bottom: 10px;
  font-size: ${props => props.theme.smallTextSize};
  color: #e74c3c;
`

const InputField = ({
  field, // { name, value, onChange, onBlur }
  form: { errors, handleChange }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => (
  <View>
    {props.maskMoney ? (
      <MaskedInput
        type="money"
        onChangeText={handleChange(field.name)}
        value={field.value}
        {...props}
      />
    ) : (
      <Input onChangeText={handleChange(field.name)} {...props} />
    )}
    {errors[field.name] && <ErrorMessage>{errors[field.name]}</ErrorMessage>}
  </View>
)

export default InputField
