import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import FormControl from '@material-ui/core/FormControl'
import InputBase from '@material-ui/core/InputBase/InputBase'
import InputAdornment from '@material-ui/core/InputAdornment'
import Icon from '../Icon/Icon'
import { useTranslation } from 'react-i18next'
import ButtonBase from '@material-ui/core/ButtonBase'
import { useDispatch, useSelector } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'
import { selectSendStatus } from '../../store/chat/selectors'
import { sliceStatus } from '../../store/sliceStatus'
import { sendMessage } from '../../store/chat/thunks'
import { useTheme } from '@material-ui/core'
import { selectUserInfo } from '../../store/user/selectors'

const useStyles = makeStyles(theme => ({
  container: {
    position: 'relative'
  },
  mail: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 58,
    height: 58,
    position: 'absolute',
    top: '-27px',
    right: '100px',
    borderRadius: 50,
    zIndex: 2,
    background: theme.palette.primary.main
  },
  inputContainer: {
    width: '100%',
    borderBottom: '1px solid #CDCDCD'
  },
  input: {
    height: 76,
    padding: `${theme.spacing(2.5)}px ${theme.spacing(5.25)}px`,
    borderTop: `1px solid ${theme.palette.text.lightGray}`,
    fontSize: theme.typography.body2.fontSize
  },
  sendButton: {
    width: 36,
    height: 36
  },
  attachments: {
    width: 16,
    paddingRight: theme.spacing(0.5)
  }
}))
const SendMessage = ({ senderId, recipientId, roomId }) => {
  const status = useSelector(selectSendStatus)
  const { id } = useSelector(selectUserInfo)
  const theme = useTheme()
  const classes = useStyles()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [text, setText] = useState('')

  const submitMessage = async () => {
    if (text && text.length > 0 && senderId && recipientId) {
      const message = {
        senderId: id,
        recipientId: recipientId === id ? senderId : recipientId,
        chatRoomId: roomId,
        content: text
      }
      await dispatch(sendMessage({ message }))
      setText('')
    }
  }

  const handleKeyPress = async (e) => {
    if (e.key === 'Enter') {
      await submitMessage()
    }
  }
  return (
    <Box className={classes.container} mt={2}>
      <Box className={classes.mail}>
        <ButtonBase className={classes.sendButton} onClick={submitMessage}>
          <Icon type='chatMail'/>
        </ButtonBase>
      </Box>
      <FormControl className={classes.inputContainer}>
        <InputBase
          className={classes.input}
          variant='outlined'
          placeholder={t('chat.enterMessage')}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyPress}
          startAdornment={
            <InputAdornment position="start">
              {status !== sliceStatus.LOADING && <ButtonBase className={classes.attachments}>
                <Icon type='attachments' />
              </ButtonBase>}
              {status === sliceStatus.LOADING && <span style={{ width: 16, dispaly: 'block', color: theme.palette.primary.main }} >
                <CircularProgress color={'inherit'} size={20}/>
              </span>}
            </InputAdornment>
          }

        />
      </FormControl>
    </Box>
  )
}

export default SendMessage