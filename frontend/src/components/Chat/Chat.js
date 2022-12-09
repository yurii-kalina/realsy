import React, { useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Contacts from './Contacts'
import ChatWindow from './ChatWindow'
import { sliceStatus } from '../../store/sliceStatus'
import { wsSubscribeChat, wsUnsubscribeChat } from '../../store/middleware/actions'
import { selectSocketChatStatus, selectSocketStatus } from '../../store/websocket/selectors'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '../../store/user/selectors'
import Box from '@material-ui/core/Box'

const useStyles = makeStyles(theme => ({
  contact: {
    borderRight: `1px solid ${theme.palette.text.lightGray}`
  }

}))
const Chat = () => {
  const classes = useStyles()
  const isSocketConnected = useSelector(selectSocketStatus)
  const isChatSubscribed = useSelector(selectSocketChatStatus)
  const { status, user } = useSelector(selectUser)
  const dispatch = useDispatch()
  useEffect(() => {
    if (!isChatSubscribed && isSocketConnected && user && user.id && status === sliceStatus.SUCCEEDED) {
      dispatch(wsSubscribeChat(user.id))
    }
  }, [dispatch, isChatSubscribed, isSocketConnected, status, user])

  useEffect(() => {
    return function cleanup () {
      dispatch(wsUnsubscribeChat(user && user.id))
    }
  }, [dispatch, user])

  return (
    <Grid container className={classes.chatContainer}>
      <Grid item sm={5} className={classes.contact}>
        <Contacts/>
      </Grid>
      <Grid item sm={7}>
        <Box display='flex' flexWrap='wrap'>
          <ChatWindow/>
        </Box>
      </Grid>

    </Grid>
  )
}

export default Chat