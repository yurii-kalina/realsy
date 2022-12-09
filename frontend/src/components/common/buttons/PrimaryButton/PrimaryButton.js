import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import ButtonBase from '@material-ui/core/ButtonBase'
import { useStyles } from './styles'
import Icon from '../../../Icon'

const PrimaryButton = ({
  text, size = 'medium', variant = 'default', icon, iconPosition, background,
  iconColor, iconSize, width, height, fontSize, fontWeight, color, onClick, children
}) => {
  const classes = useStyles({ width, height, color, background, iconPosition, iconSize, fontSize, fontWeight })
  return (
    <ButtonBase className={clsx(classes.button, classes[variant], classes[size])} onClick={onClick}>
      {icon && iconPosition === 'left'
        ? <span className={clsx(classes.icon)}>
          <Icon type={icon} color={iconColor}/>
        </span>
        : null}
      {text}
      {children}
      {icon && iconPosition === 'right'
        ? <span className={clsx(classes.icon)}>
          <Icon type={icon} color={iconColor}/>
        </span>
        : null}
    </ButtonBase>
  )
}

PrimaryButton.propTypes = {
  text: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large', 'custom']),
  variant: PropTypes.oneOf(['default', 'bordered']),
  color: PropTypes.string,
  icon: PropTypes.string,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  iconSize: PropTypes.number,
  iconColor: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  fontSize: PropTypes.string,
  fontWeight: PropTypes.string,
  onClick: PropTypes.func
}

export default PrimaryButton
