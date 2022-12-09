import React from 'react'
import * as icons from '../../theme/icons'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

export const useStyles = makeStyles((theme) => ({
  icon: props => ({
    display: 'inline-block',
    width: props.size || '100%',
    verticalAlign: 'middle',
    '& > svg': {
      display: 'block'
    }
  }),
  unClickable: {
    pointerEvents: 'none'
  }
}))

function Icon ({ type, color, secondary, filled, size, isUnClickable, onClick }) {
  const classes = useStyles({ size })
  const iconJsx = icons[type]

  if (!iconJsx) {
    return null
  }
  return (
    <span onClick={onClick} className={clsx(classes.icon, { [classes.unClickable]: isUnClickable })}>
      {iconJsx(color, secondary, filled)}
    </span>
  )
}

export default React.memo(Icon)
