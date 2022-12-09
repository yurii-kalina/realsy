import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import PrimaryButton from '../../common/buttons/PrimaryButton'
import { Box } from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    maxWidth: '50%',
    margin: '0 15px',
    padding: '15px',
    filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
    boxShadow: '0px 0px 30px rgba(45, 172, 253, 0.3)'
  },
  box: {
    display: 'flex',
    marginRight: '20px',
    '& img': {
      marginRight: '15px'
    }
  },
  btnBlock: {
    marginTop: '15px',
    textAlign: 'right'
  },
  btn: props => ({
    backgroundColor: props.color,
    display: 'inline-block',
    padding: '10px 20px',
    fontSize: '18px',
    color: 'white',
    marginTop: '20px',
    '& :hover': {
      background: props.btnHover
    }
  })
})

export default function ImgCard (props) {
  const classes = useStyles(props)

  return (
    <Card className={classes.root}>
      <CardActionArea className={classes.box}>
        <img src={props.img} alt={props.title}/>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.desc}
          </Typography>
          <Box className={classes.btnBlock}>
            <PrimaryButton text={props.btnText} width={217} height={50} size={'custom'} fontSize={'18px'}
              background={props.color}/>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}