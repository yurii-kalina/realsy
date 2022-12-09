import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import ButtonBase from '@material-ui/core/ButtonBase'

const useStyles = makeStyles((theme) => ({
  button: {
    minWidth: 195,
    height: 40,
    padding: theme.buttonPadding,
    borderRadius: 8,
    backgroundColor: '#EEEFF1',
    color: theme.palette.text.secondary,
    fontSize: theme.typography.body2.fontSize,
    textTransform: 'capitalize'
  },
  mandatory: {
    backgroundColor: theme.palette.primary.main,
    color: 'white'
  },
  optional: {
    backgroundColor: theme.palette.orange,
    color: 'white'
  }
}))
const ConfigValueButton = ({ text, isMandatory, isOptional, onClick }) => {
  const classes = useStyles()
  return (
    <ButtonBase onClick={onClick}
      className={clsx(classes.button, { [classes.mandatory]: isMandatory }, { [classes.optional]: isOptional })}>
      {text}
    </ButtonBase>
  )
}

ConfigValueButton.propTypes = {
  text: PropTypes.string.isRequired,
  isMandatory: PropTypes.bool,
  isOptional: PropTypes.bool,
  onClick: PropTypes.func
}
export default ConfigValueButton
