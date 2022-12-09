import React from 'react'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import Popper from '@material-ui/core/Popper'
import Icon from '../../Icon'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import { selectUser } from '../../../store/user/selectors'
import { useSelector } from 'react-redux'
import ButtonBase from '@material-ui/core/ButtonBase'
import UserMenu from './UserMenu'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'

const useStyles = makeStyles(theme => ({
  avatar: {
    width: 50,
    height: 50
  },
  avatarFallBack: {
    display: 'block',
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.secondary.main
  },
  arrow: {
    display: 'block',
    width: 16,
    marginLeft: theme.spacing(1.25)
  },
  name: {
    display: 'flex'
  }
}))

const User = props => {
  const { user } = useSelector(selectUser)
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef(null)

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }

    setOpen(false)
  }

  return (
    <>
      <div>
        <Popper open={open} anchorEl={anchorRef.current} transition placement={'bottom-end'}>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: 'center top' }}
            >
              <Paper elevation={0}>
                <ClickAwayListener onClickAway={handleClose}>
                  <div>
                    <UserMenu/>
                  </div>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>

      <ButtonBase disableRipple onClick={handleToggle} ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}>
        <Avatar src={user && user.avatar}>
          <span className={classes.avatarFallBack}/>
        </Avatar>
        <Box ml={2}>
          <Typography component={'a'} variant={'body1'} className={classes.name}>
            {user && user.fullName && user.fullName.split(' ') && user.fullName.split(' ')[0]}
            <span className={classes.arrow}>
              <Icon type={'arrowDown'}/>
            </span>
          </Typography>
        </Box>
      </ButtonBase>
    </>
  )
}

export default User
