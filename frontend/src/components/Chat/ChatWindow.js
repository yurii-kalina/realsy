import React, { useEffect, useRef } from 'react'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import ChatMessage from './ChatMessage'
import SendMessage from './SendMessage'
import { useDispatch, useSelector } from 'react-redux'
import { selectMessages } from '../../store/chat/selectors'
import { useParams } from 'react-router-dom'
import { sliceStatus } from '../../store/sliceStatus'
import { selectUserInfo } from '../../store/user/selectors'
import { fetchMessages } from '../../store/chat/thunks'
import Loading from '../Loading'
import { Scrollbars } from 'react-custom-scrollbars'
import { useTranslation } from 'react-i18next'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  window: {
    minHeight: 500,
    position: 'relative'
  },
  selectContact: {
    color: theme.palette.text.lightGray,
    fontStyle: 'italic'
  }
}))
const ChatWindow = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const classes = useStyles()
  const { status, items } = useSelector(selectMessages)
  const { id: userId, avatar } = useSelector(selectUserInfo)
  const ref = useRef()

  useEffect(() => {
    async function getMessages () {
      if (id && +id !== items.messages.id) {
        await dispatch(fetchMessages({ id }))
      }
      if (ref && ref.current !== null && typeof ref.current !== 'undefined') {
        ref.current.scrollToBottom()
      }
    }

    getMessages()
  }, [dispatch, id, items.messages.id])

  if (status === sliceStatus.SUCCEEDED) {
    return (
      <Scrollbars
        ref={ref}
        style={{ height: 500 }}
        autoHide={true}
        renderTrackHorizontal={props => <div {...props} className="track-horizontal" style={{ display: 'none' }}/>}>
        <Box className={classes.window} display='flex' flexDirection='column-reverse'>
          {status === sliceStatus.SUCCEEDED && <> <Box>
            <SendMessage roomId={items && items.id} senderId={items && items.sender && items.sender.id}
              recipientId={items && items.recipient && items.recipient.id}/>
          </Box>
          <Box display='flex'
            flexWrap='wrap'>
            {items && items.messages && items.messages.length > 0 && items.messages.map(item =>
              <ChatMessage
                message={item && item.content}
                avatar={item && item.sender && item.sender.id !== userId ? item.sender.avatar : avatar}
                isSender={item && item.sender && item.sender.id !== userId}
              />)}
          </Box></>}
          {status === sliceStatus.LOADING && <Loading/>}
        </Box>
      </Scrollbars>
    )
  } else if (status === sliceStatus.LOADING) {
    return (
      <Box width={1} height={500} display='flex' justifyContent='center' alignItems='center'>
        <Loading/>
      </Box>
    )
  } else {
    return (
      <>
        {status === sliceStatus.IDLE &&
        <Box width={1} height={500} display='flex' justifyContent='center' alignItems='center'>
          <Typography variant='h3' component='h3'
            className={classes.selectContact}>{t('chat.selectContact')}</Typography>
        </Box>}
      </>
    )
  }
}

export default ChatWindow