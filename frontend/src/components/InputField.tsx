import * as React from 'react'
import styled from '../styled-components-config'
import { View, TextInput } from 'react-native'
import { TextInputMask } from 'react-native-masked-text'

const ErrorMessage = styled.Text`
  color: #e74c3c;
`

const InputField = ({
  field, // { name, value, onChange, onBlur }
  form: { errors, handleChange }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => (
  <View>
    {props.maskMoney ? (
      <TextInputMask
        type="money"
        onChangeText={handleChange(field.name)}
        value={field.value}
        {...props}
      />
    ) : (
      <TextInput onChangeText={handleChange(field.name)} {...props} />
    )}
    {errors[field.name] && <ErrorMessage>{errors[field.name]}</ErrorMessage>}
  </View>
)

export default InputField
