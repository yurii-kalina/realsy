import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  avatar: props => ({
    width: 75,
    height: 75,
    marginLeft: props.isSender ? theme.spacing(5.25) : 0,
    marginRight: props.isSender ? 0 : theme.spacing(5.25)
  }),
  body: props => ({
    dispaly: 'flex',
    alignContent: 'center',
    marginLeft: props.isSender ? theme.spacing(2.5) : 0,
    marginRight: props.isSender ? 0 : theme.spacing(2.5),
    padding: `${theme.spacing(1.25)}px ${theme.spacing(2)}px`,
    background: props.isSender ? '#EDF2F5' : 'rgba(45, 172, 253, .15)',
    borderRadius: 10
  }),
  message: props => ({
    flexDirection: props.isSender ? 'row' : 'row-reverse',
    flexBasis: '100%'
  })

}))
const ChatMessage = ({ isSender, message, avatar }) => {
  const classes = useStyles({ isSender })
  return (
    <Box display='flex' className={classes.message} alignItems='center' py={1}>
      <Avatar className={classes.avatar} src={avatar}/>
      <Typography variant='body2' component='p' className={classes.body}>
        {message}
      </Typography>
    </Box>
  )
}

export default ChatMessage