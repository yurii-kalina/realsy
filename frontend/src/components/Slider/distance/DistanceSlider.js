import React from 'react'
import { useTranslation } from 'react-i18next'
import Icon from '../../Icon'
import Box from '@material-ui/core/Box'
import { StyledSlider } from './StyledSlider'
import PropTypes from 'prop-types'

const thumb = (props) => {
  return (
    <span {...props}>
      {props.children}
      <span style={{ width: 25 }}>
        <Icon type={'person'}/>
      </span>
    </span>
  )
}

const DistanceSlider = ({ defaultValue, onChangeCommitted }) => {
  const { t } = useTranslation()
  return (
    <Box display={'flex'} alignItems={'flex-end'} justifyContent={'center'} height={96} width={1}>
      <StyledSlider
        defaultValue={defaultValue || 20}
        valueLabelDisplay="on"
        ThumbComponent={thumb}
        valueLabelFormat={(value) => `${value} ${t('minutes')}`}
        step={5}
        marks
        min={5}
        max={40}
        onChangeCommitted={onChangeCommitted}
      />
    </Box>
  )
}

DistanceSlider.propTypes = {
  onChangeCommitted: PropTypes.func
}

export default DistanceSlider
