import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Link from '@material-ui/core/Link'
import { Link as RouterLink } from 'react-router-dom'
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
  list: {
    display: 'flex',
    alignItems: 'space-between'
  },
  item: {
    padding: 0,
    fontSize: theme.typography.body2.fontSize,
    fontWeight: theme.typography.fontWeightBold,
    textTransform: 'capitalize'
  },
  links: {
    color: theme.palette.text.lightGray,
    cursor: 'pointer'
  },
  active: {
    color: theme.palette.text.primary
  }
}))

const ProfileNavigation = ({ items = [], selected }) => {
  const classes = useStyles()
  return (
    <List disablePadding component='nav' className={classes.list}>
      {items.map((item, i) => (
        <ListItem key={i} className={classes.item}>
          <Link component={RouterLink} to={item.link} className={clsx(classes.links, { [classes.active]: selected === item.link })}>{item.value}</Link>
        </ListItem>
      ))}
    </List>
  )
}

export default ProfileNavigation