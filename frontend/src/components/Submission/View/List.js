import React from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { useTranslation } from 'react-i18next'
import Sort from '../../common/Sort'

const useStyles = makeStyles(theme => ({
  container: {
    padding: '50px 0'
  },
  results: {
    color: theme.palette.text.darkGray,
    fontWeight: theme.typography.fontWeightBold
  },
  window: {
    background: 'white'
  }
}))

const List = ({ size = 0, children, setViewTile, viewType, isSortVisible = true, sortHandler }) => {
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <Grid container spacing={4} className={classes.container}>
      {isSortVisible && <Box width={1} px={2} display='flex' justifyContent='space-between' alignItems='center'>
        <Typography variant='body1' className={classes.result}>
          {t('results')}: {size}
        </Typography>
        <Sort viewType={viewType} sortHandler={sortHandler} viewHandler={setViewTile}/>
      </Box>}
      {children}
    </Grid>
  )
}

export default List
