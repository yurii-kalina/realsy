import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Link from '@material-ui/core/Link'
import { Link as RouterLink } from 'react-router-dom'
import { Paths } from '../../../constants'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles(theme => ({
  item: {
    padding: 0,
    paddingTop: `${theme.spacing(1.25)}px`,
    fontSize: theme.typography.body2.fontSize,
    fontWeight: theme.typography.fontWeightLight,
    textTransform: 'capitalize'
  },
  links: {
    color: theme.palette.text.secondary,
    cursor: 'pointer'
  }
}))
const UserNavigationTop = () => {
  const classes = useStyles()
  const { t } = useTranslation()
  return (
    <Box px={2.5} py={2}>
      <List disablePadding component='nav' className={classes.list}>
        <ListItem className={classes.item}>
          <Link component={RouterLink} className={classes.links} to={`${Paths.AD}`}>{t('user.myAds')}</Link>
        </ListItem>
        <ListItem className={classes.item}>
          <Link component={RouterLink} className={classes.links} to={`${Paths.PROPERTY}`}>{t('profile.myProperties')}</Link>
        </ListItem>
        <ListItem className={classes.item}>
          <Link component={RouterLink} className={classes.links} to={`/profile${Paths.PROPOSITION}`}>{t('user.propositions')}</Link>
        </ListItem>
        <ListItem className={classes.item}>
          <Link component={RouterLink} className={classes.links} to={Paths.CHAT}>{t('user.notifications')}</Link>
        </ListItem>
        <ListItem className={classes.item}>
          <Link component={RouterLink} className={classes.links} to='#'> {t('user.payments')}</Link>
        </ListItem>
        <ListItem className={classes.item}>
          <Link component={RouterLink} className={classes.links} to={'#'}> {t('user.settings')}</Link>
        </ListItem>
      </List>
    </Box>
  )
}
export default UserNavigationTop