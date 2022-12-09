import React, { useState } from 'react'
import { Box, useTheme } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@material-ui/core/styles'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import FormControl from '@material-ui/core/FormControl'
import Grid from '@material-ui/core/Grid'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import PrimaryButton from '../common/buttons/PrimaryButton'
import Icon from '../Icon/Icon'
import { sendPropositionMessage } from '../../store/chat/thunks'
import { selectSendStatus } from '../../store/chat/selectors'
import { sliceStatus } from '../../store/sliceStatus'
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'

const useStyles = makeStyles(theme => ({
  title: {
    color: '#000',
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.body1.fontSize
  },
  formControl: {
    width: '100%',
    '& .MuiOutlinedInput-root': {
      borderRadius: 15
    }
  },
  loading: {
    marginTop: theme.spacing(0.4),
    padding: theme.spacing(1.25),
    color: 'white'
  },
  textArea: {
    display: 'flex',
    alignItems: 'flex-start',
    width: '100%',
    height: 260,
    borderRadius: 15,
    padding: 20,
    backgroundColor: '#EEEFF1',
    fontSize: theme.typography.body2.fontSize,
    '& .MuiOutlinedInput-root:hover': {
      border: `1px solid ${theme.palette.primary.main}`
    }
  },
  textAreaLabel: {
    paddingTop: 5,
    color: '#BDBDBD',
    fontSize: theme.typography.body2.fontSize
  },
  infoIcon: {
    display: 'block',
    width: 28,
    margin: '0px 20px'
  },
  info: {
    width: '100%',
    height: 260,
    padding: 20,
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: 8,
    backgroundColor: theme.palette.fadedBlue,
    boxSizing: 'border-box'
  },
  infoText: {
    color: '#000000',
    fontSize: theme.typography.htmlFontSize,
    whiteSpace: 'pre-line'
  }
}))

const SendPropositionMessage = ({ sender, recipient }) => {
  const history = useHistory()
  const classes = useStyles()
  const dispatch = useDispatch()
  const theme = useTheme()
  const { t } = useTranslation()
  const [message, setMessage] = useState('')
  const status = useSelector(selectSendStatus)
  const submitMessage = async () => {
    if (message && message.length > 0 && sender && recipient) {
      const toSend = {
        senderId: sender.id,
        recipientId: recipient.id,
        chatRoomId: null,
        content: message
      }
      const response = await dispatch(sendPropositionMessage({ message: toSend }))
      if (response && response.payload && response.payload.chatRoom && response.payload.chatRoom.id) {
        setMessage('')
        history.push(`/chat/${response.payload.chatRoom.id}`)
      }
    }
  }
  return (
    <Grid container>
      <Box mt={5} width={1}>
        <Typography variant={'body2'} className={classes.title}>
          {t('propositions.sendMessage')}
        </Typography>
        <Box display={'flex'} mt={2.5}>
          <Grid item sm={7}>
            <FormControl className={classes.formControl}>
              <OutlinedInput rowsMin={5} rowsMax={10} className={classes.textArea} multiline
                name={'message'}
                value={message}
                onChange={(e) => setMessage(e.target.value)}/>
            </FormControl>
            <Box mt={3} justifySelf={'flex-end'} flexBasis='100%' textAlign='right'>
              <PrimaryButton onClick={submitMessage}
                fontSize={theme.typography.body2.fontSize}
                text={t('propositions.send')}
                color={'white'} size='small'
                background={theme.palette.primary.main}>
                {status === sliceStatus.LOADING &&
                <span className={classes.loading}>
                  <CircularProgress color={'inherit'} size={20}/>
                </span>
                }
              </PrimaryButton>
            </Box>
          </Grid>
          <Grid item sm={1}>
            <span className={classes.infoIcon}>
              <Icon type={'info'}/>
            </span>
          </Grid>
          <Grid item sm={4}>
            <Box className={classes.info}>
              <Typography component={'p'} variant={'body2'} className={classes.infoText}>
                {t('messageInfo')}
              </Typography>
            </Box>
          </Grid>
        </Box>
        <Box display='flex' justfiyContent={'flex-end'}>
          <Grid item sm={7}>
          </Grid>
        </Box>
      </Box>
    </Grid>
  )
}

export default SendPropositionMessage
