import React from 'react'
import Box from '@material-ui/core/Box'
import PropTypes from 'prop-types'
import Icon from '../../Icon'
import { GradientSlider } from './GradientSlider'

const thumb = (props, iconColor, iconName) => {
  return (
    <span {...props}>
      {props.children}
      <span style={{ width: 33 }}>
        <Icon type={iconName || 'sliderIcon'} color={iconColor}/>
      </span>
    </span>
  )
}

const marks = [
  {
    value: 0,
    label: <span style={{ marginLeft: 14 }}><Icon type={'sad'}/></span>
  },
  {
    value: 25,
    label: <Icon type={'littleSad'}/>
  },
  {
    value: 50,
    label: <Icon type={'neutral'}/>
  },
  {
    value: 75,
    label: <Icon type={'littleHappy'}/>
  },
  {
    value: 100,
    label: <span style={{ marginLeft: -14 }}><Icon type={'happy'}/></span>
  }
]

const PriceSlider = ({ onChangeCommitted, value, setValue, iconColor = 'white', iconName }) => {
  return (
    <Box width={1} flexBasis={'100%'} height={120} display={'flex'} alignItems={'flex-end'}>
      <GradientSlider ThumbComponent={(props) => thumb(props, iconColor, iconName)} track={false} marks={marks}
        value={value} onChange={(e, v) => setValue(v)}
        onChangeCommitted={onChangeCommitted}/>
    </Box>
  )
}

PriceSlider.propTypes = {
  onChangeCommitted: PropTypes.func,
  setValue: PropTypes.func,
  value: PropTypes.number,
  iconColor: PropTypes.string,
  iconName: PropTypes.string
}
export default PriceSlider
