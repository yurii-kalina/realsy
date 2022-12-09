import React from 'react'
import Range from './Range'
import Priority from './Priority'
import Price from './Price'

const Types = ({ configuration }) => {
  if (configuration.type) {
    switch (configuration.type.name) {
      case 'range':
        return <Range unit={configuration.unit} name={configuration.name} values={configuration.values}/>
      case 'priority':
      case 'prioritySlider':
        return <Priority name={configuration.name} values={configuration.values}/>
      case 'price':
        return <Price name={configuration.name} values={configuration.values}/>
      default:
        return null
    }
  }
  return null
}

export default Types