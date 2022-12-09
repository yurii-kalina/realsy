import React from 'react'
import Navigation from './Navigation'
import Subscribe from './Subscribe'
import SocialMedia from './SocialMedia'
import Grid from '@material-ui/core/Grid'
import CopyRight from './CopyRight'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles(theme => ({
  label: {
    fontWeight: theme.typography.fontWeightBold,
    textTransform: 'capitalize'
  }
}))

const Footer = props => {
  const classes = useStyles()
  const { t } = useTranslation()
  return (
    <Grid container spacing={0} justify={'center'} alignItems={'center'}>
      <Grid item sm={10}>
        <Grid item sm={12}>
          <Navigation/>
        </Grid>
        <Grid container>
          <Grid item sm={6}>
            <Subscribe/>
          </Grid>
          <Grid item sm={6}>
            <Box textAlign={'right'}>
              <Typography className={classes.label} component={'h4'}
                variant={'h4'}>{t('followUs')}</Typography>
            </Box>
            <SocialMedia/>
          </Grid>
        </Grid>
        <Grid item sm={12}>
          <CopyRight/>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Footer
