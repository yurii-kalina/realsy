import React from 'react'
import Typography from '@material-ui/core/Typography'
import Icon from '../../Icon'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

const useStyles = makeStyles((theme) => ({
  label: props => ({
    display: 'flex',
    alignItems: 'center',
    color: props.color || theme.palette.text.darkGray,
    fontSize: props.fontSize || theme.typography.body2.fontSize,
    fontWeight: props.fontWeight || theme.typography.fontWeightRegular,
    textTransform: props.textTransform || 'capitalize',
    overflow: props.overflow || 'inherit',
    whiteSpace: props.overflow ? 'nowrap' : 'inherit'
  }),
  icon: {
    display: 'flex',
    width: 20,
    marginRight: 15,
    marginBottom: 3
  }
}))

const FormSectionLabel = ({ text, textTransform, overflow, fontSize, fontWeight, icon, color, iconColor, children, component, iconSize }) => {
  const classes = useStyles({ color, fontSize, fontWeight, icon, textTransform, overflow })
  return (
    <Typography component={component || 'h6'} variant={'body1'} className={classes.label}>
      {icon ? <span className={classes.icon}><Icon size={iconSize} type={icon} color={iconColor}/></span> : null}
      {children || <span>{text}</span>}
    </Typography>

  )
}

FormSectionLabel.propTypes = {
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  icon: PropTypes.string,
  color: PropTypes.string
}

export default FormSectionLabel
