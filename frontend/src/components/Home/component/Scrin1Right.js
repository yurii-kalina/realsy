import Container from '@material-ui/core/Container'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles(theme => ({
  header_home_img: {
    paddingRight: 0,
    textAlign: 'right',
    overflow: 'hidden'
  }
}))

export const Scrin1Right = () => {
  const classes = useStyles()

  return (
    <Grid item lg={6} justify="center">
      <Container className={classes.header_home_img}>
        <img className={classes.img} src="./home_house.png" alt="REALSY"/>
      </Container>
    </Grid>
  )
}