import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ButtonBase from '@material-ui/core/ButtonBase'
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
  container: {
    borderTop: `1px solid ${theme.palette.text.light}`
  },
  links: {
    marginRight: theme.spacing(7),
    position: 'relative',
    color: theme.palette.text.primary,
    fontSize: theme.typography.body2.fontSize,
    textTransform: 'capitalize'
  },
  active: {
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightBold,
    '&::after': {
      display: 'block',
      position: 'absolute',
      bottom: -3,
      left: 0,
      width: 52,
      height: 2,
      background: theme.palette.orange,
      content: '""'
    }
  }
}))
const HeaderLinks = ({ text, isActive, clickHandler }) => {
  const classes = useStyles()
  return (
    <ButtonBase component='a' disableRipple className={clsx(classes.links, { [classes.active]: isActive })}
      onClick={clickHandler}>
      {text}
    </ButtonBase>
  )
}
export default HeaderLinks
