import React, { useEffect, useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { useTheme } from '@material-ui/core'
import FormSectionLabel from '../common/labels/FormSectionLabel'
import ButtonBase from '@material-ui/core/ButtonBase'
import { useSelector } from 'react-redux'
import { selectUserInfo } from '../../store/user/selectors'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  avatar: {
    width: 92,
    height: 92
  },
  status: {
    display: 'block',
    width: 10,
    height: 10,
    borderRadius: '50%',
    backgroundColor: theme.palette.secondary.main
  },
  statusText: {
    marginLeft: 10,
    color: theme.palette.text.secondary
  },
  name: {
    flexBasis: '100%',
    color: '#000000',
    fontWeight: theme.typography.fontWeightBold
  },
  propertyName: {
    flexBasis: '100%',
    marginTop: theme.spacing(1.25),
    color: '#000000',
    fontWeight: theme.palette.text.secondary
  },
  button: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    textAlign: 'left'
  },
  badge: {
    display: 'block',
    width: 25,
    minWidth: 25,
    height: 25,
    marginRight: theme.spacing(2),
    borderRadius: '50%',
    background: theme.palette.primary.main,
    lineHeight: '25px',
    textAlign: 'center',
    color: 'white'
  }
}))

const ContactItem = ({ room = {} }) => {
  const [name, setName] = useState('')
  const [avatar, setAvatar] = useState('')
  const { id: userId } = useSelector(selectUserInfo)
  const { id, sender, recipient, unread } = room
  const classes = useStyles()
  const theme = useTheme()
  const history = useHistory()

  const handleChatOpen = () => {
    history.push(`/chat/${id}`)
  }

  useEffect(() => {
    if (sender && recipient) {
      if (+sender.id !== +userId) {
        setName(sender.fullName)
        setAvatar(sender.avatar)
      } else if (+recipient.id !== +userId) {
        setName(recipient.fullName)
        setAvatar(recipient.avatar)
      }
    }
  }, [id, recipient, sender, userId])
  return (
    <Box display='flex' pt={3.5} alignItems='center'>
      <Box>
        <Avatar src={avatar} className={classes.avatar}/>
        <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
          <span className={classes.status}/>
          <Typography className={classes.statusText} variant={'subtitle1'}
            component={'span'}>Online</Typography>
        </Box>
      </Box>
      <Box ml={2} display='flex' alignItems='center'>
        <ButtonBase className={classes.button} disableRipple onClick={handleChatOpen}>
          <Typography variant={'body2'} className={classes.name}>
            {name}
          </Typography>
          <Typography variant={'body2'} className={classes.propertyName}>
                        ЖК Новопечерські липки
          </Typography>
          <Box mt={1.25} flexBasis='100%'>
            <FormSectionLabel iconSize={16} fontSize={theme.typography.subtitle1.fontSize} component='span'
              icon='locationFilled' color={theme.palette.text.secondary}
              text='ЖК Новопечерські липки'/>
          </Box>
          <Box mt={1.25} flexBasis='100%'>
            <FormSectionLabel fontSize={theme.typography.subtitle1.fontSize}
              iconColor={theme.palette.text.lightGray} component='span' icon='money'
              color={theme.palette.text.secondary} text='15000 UAH'/>
          </Box>
        </ButtonBase>
        {unread > 0 && <Typography variant='body2' className={classes.badge}>{unread}</Typography>}
      </Box>
    </Box>
  )
}

export default ContactItem