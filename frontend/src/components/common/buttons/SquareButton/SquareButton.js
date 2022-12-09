import ButtonBase from '@material-ui/core/ButtonBase'
import React from 'react'
import { useStyles } from './styles'
import clsx from 'clsx'
import Typography from '@material-ui/core/Typography'

const SquareButton = ({ text, isActive, size = 'large', error, onClick }) => {
  const classes = useStyles()
  return (
    <ButtonBase onClick={onClick}
      className={clsx(classes.button, classes[size], { [classes.active]: isActive }, { [classes.error]: error })}>
      <Typography variant={'body2'} component={'span'} className={clsx(text, { [classes.textActive]: isActive })}>
        {text}
      </Typography>
    </ButtonBase>
  )
}

export default SquareButton
