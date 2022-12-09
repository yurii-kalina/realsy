import React from 'react'
import ButtonBase from '@material-ui/core/ButtonBase'
import { useStyles } from './styles'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import Icon from '../../../Icon'
import { useTheme } from '@material-ui/core'

const SimpleFormButton = ({ text, size = 'medium', variant = 'default', textColor, activeBgColor, icon, iconPosition, iconSize, fontSize, fontWeight, isActive, activeVariant = variant, showActive, onClick, children }) => {
  const classes = useStyles({ fontWeight, fontSize, iconSize, textColor, iconPosition, activeBgColor })
  const theme = useTheme()
  return (
    <ButtonBase
      className={clsx(classes.button, classes[variant], classes[size], classes[textColor],
        { [classes.activeDefault]: isActive && activeVariant === 'default' },
        { [classes.activeBordered]: isActive && activeVariant === 'bordered' })}
      onClick={onClick}
    >
      {icon && iconPosition === 'left' ? <span
        className={clsx(classes.icon)}>
        <Icon type={icon} color={isActive ? theme.palette.fadedBlue : undefined}/></span> : null}
      {children || <span className={classes.text}>{text}</span>}
      {icon && iconPosition === 'right' ? <span
        className={clsx(classes.icon)}>
        <Icon type={icon} color={isActive ? theme.palette.fadedBlue : undefined}/></span> : null}
      {showActive && isActive
        ? <span className={clsx([classes.icon, classes.activeIcon])}>
          <Icon type={'selected'}/></span>
        : null}
    </ButtonBase>
  )
}

SimpleFormButton.propTypes = {
  text: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['large', 'medium', 'small', 'smaller']),
  variant: PropTypes.oneOf(['default', 'bordered']),
  activeVariant: PropTypes.oneOf(['default', 'bordered']),
  textColor: PropTypes.string,
  icon: PropTypes.string,
  iconSize: PropTypes.number,
  iconPosition: PropTypes.oneOf(['left', 'right', 'flex']),
  isActive: PropTypes.bool,
  showActive: PropTypes.bool,
  fontSize: PropTypes.string,
  fontWeight: PropTypes.string,
  onClick: PropTypes.func
}
export default SimpleFormButton
