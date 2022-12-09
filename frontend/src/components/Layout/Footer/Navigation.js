import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import { useTranslation } from 'react-i18next'

import { makeStyles } from '@material-ui/core/styles'
import Link from '@material-ui/core/Link'

const useStyles = makeStyles(theme => ({
  list: {
    display: 'flex',
    alignItems: 'space-between',
    padding: '50px 0px'
  },
  item: {
    padding: 0,
    fontSize: theme.typography.body2.fontSize,
    fontWeight: theme.typography.fontWeightMedium,
    textTransform: 'capitalize'
  },
  links: {
    color: theme.palette.text.gray,
    cursor: 'pointer'
  }
}))
const Navigation = props => {
  const { t } = useTranslation()
  const classes = useStyles()
  return (
    <List disablePadding component='nav' className={classes.list}>
      <ListItem className={classes.item}>
        <Link className={classes.links}>{t('aboutUs')}</Link>
      </ListItem>
      <ListItem className={classes.item}>
        <Link className={classes.links}>{t('rent')}</Link>
      </ListItem>
      <ListItem className={classes.item}>
        <Link className={classes.links}>{t('buy')}</Link>
      </ListItem>
      <ListItem className={classes.item}>
        <Link className={classes.links}> {t('privatePolicy')}</Link>
      </ListItem>
      <ListItem className={classes.item}>
        <Link className={classes.links}> {t('termsOfUse')}</Link>
      </ListItem>
      <ListItem className={classes.item}>
        <Link className={classes.links}>{t('downloadApp')}</Link>
      </ListItem>
    </List>
  )
}

export default Navigation
