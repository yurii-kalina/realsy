import { IMaskInput } from 'react-imask'
import React from 'react'

const PHONE_MASK = '+{38\\0} (00) 000-00-00'

const PhoneMask = ({ inputRef, onChange, name, ...other }) => {
  return (
    <IMaskInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null)
      }}
      mask={PHONE_MASK}
      name={name}
      lazy={true}
      onComplete={(value, mask) => {
        onChange({
          target: {
            name: name,
            value: mask.unmaskedValue
          }
        })
      }}
    />
  )
}
export default PhoneMask
