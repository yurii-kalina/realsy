import React from 'react'
import PropTypes from 'prop-types'
import Icon from '../../../Icon'
import clsx from 'clsx'
import ButtonBase from '@material-ui/core/ButtonBase'
import Typography from '@material-ui/core/Typography'
import { useStyles } from './styles'
import Box from '@material-ui/core/Box'

const Checkbox = ({ text, isActive, size = 'small', position = 'left', textColor, checkboxColor, activeColor, onClick, width, fontSize }) => {
  const classes = useStyles({ checkboxColor, textColor, activeColor, width, fontSize })
  return (
    <ButtonBase disableRipple onClick={onClick} className={classes.container}>
      {position === 'left' && <span
        className={clsx(classes.checkbox, classes[size], classes[position], { [classes.active]: isActive }, { [classes.custome]: width })}>
        {isActive ? <Icon type={'checked'}/> : null}
      </span>}
      {text ? <Typography variant={'body2'} className={classes.label}>{text}</Typography> : null}
      {position === 'right' && <Box ml={2.5}><span
        className={clsx(classes.checkbox, classes[size], classes[position], { [classes.active]: isActive }, { [classes.custome]: width })}>
        {isActive ? <Icon type={'checked'}/> : null}
      </span></Box>}
    </ButtonBase>
  )
}

Checkbox.propTypes = {
  text: PropTypes.string,
  isActive: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  position: PropTypes.string,
  textColor: PropTypes.string,
  checkboxColor: PropTypes.string,
  onClick: PropTypes.func
}

export default Checkbox
