import React from 'react'
import Box from '@material-ui/core/Box'
import Link from '@material-ui/core/Link'
import { Link as RouterLink } from 'react-router-dom'
import Icon from '../../Icon'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  icon: props => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: props.width,
    height: props.width,
    marginLeft: props.justifyContent === 'flex-end' ? props.space : 0,
    marginRight: props.justifyContent === 'flex-end' ? 0 : props.space,
    padding: props.width ? props.width / 4 : 10,
    borderRadius: 8,
    background: '#D8D8D8',
    boxSizing: 'border-box'
  }),
  label: {
    fontWeight: theme.typography.fontWeightBold,
    textTransform: 'capitalize'
  }
}))

const SocialMedia = ({ width = 45, justifyContent = 'flex-end', space = 30, iconSize = 30 }) => {
  const classes = useStyles({ width, justifyContent, space })
  return (
    <Box>
      <Box display={'flex'} justifyContent={justifyContent} mt={2}>
        <Link component={RouterLink} className={classes.icon} to='/#'>
          <Icon type={'facebook'} size={iconSize}/>
        </Link>
        <Link component={RouterLink} className={classes.icon} to='#'>
          <Icon type={'twitter'} size={iconSize}/>
        </Link>
        <Link component={RouterLink} className={classes.icon} to='#'>
          <Icon type={'linkedin'} size={iconSize}/>
        </Link>
        <Link component={RouterLink} className={classes.icon} to='#'>
          <Icon type={'instagram'} size={iconSize}/>
        </Link>
      </Box>
    </Box>
  )
}

export default SocialMedia
