import React from 'react'
import ButtonBase from '@material-ui/core/ButtonBase'
import clsx from 'clsx'
import Icon from '../../../Icon'
import { useStyles } from './styles'
import PropTypes from 'prop-types'

const DropDownButton = ({ buttonId, onClick, open, text }) => {
  const classes = useStyles()
  return (
    <ButtonBase
      aria-describedby={buttonId}
      variant="outlined"
      className={clsx(classes.button, { [classes.open]: open })}
      onClick={onClick}
    >
      {text}
      <span className={classes.icon}>
        {open ? <Icon type={'arrowUp'}/> : <Icon type={'arrowDown'}/>}
      </span>
    </ButtonBase>
  )
}

DropDownButton.propTypes = {
  buttonId: PropTypes.node,
  name: PropTypes.string,
  open: PropTypes.bool,
  onClick: PropTypes.func
}

export default DropDownButton
