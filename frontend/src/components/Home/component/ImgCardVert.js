import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'

const useStyles = makeStyles({
  root: {
    maxWidth: '315px',
    padding: '15px',
    textAlign: 'center'
  },
  title: {
    fontSize: '21px',
    fontWeight: 600
  },
  desc: {
    alignItems: 'stretch',
    marginTop: '12px',
    fontSize: '16px'
  }
})

export default function ImgCardVert (props) {
  const classes = useStyles(props)

  return (
    <>
      <Container className={classes.root}>
        <img src={props.img} alt={props.title}/>
        <Typography className={classes.title}>{props.title}</Typography>
        <Typography className={classes.desc}>{props.desc}</Typography>
      </Container>

    </>
  )
}