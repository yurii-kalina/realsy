import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import Icon from '../../Icon'

const useStyles = makeStyles((theme) => ({
  tab: props => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 317,
    height: 65,
    padding: theme.buttonPadding,
    color: props.textColor || 'white',
    backgroundColor: props.bgColor || theme.palette.primary.main,
    textTransform: 'capitalize',
    boxSizing: 'border-box'
  }),
  bottomRounded: {
    borderRadius: '0px 0px 15px 15px'
  },
  topRounded: {
    borderRadius: '15px 15px 0px 0px'
  },
  icon: {
    display: 'flex',
    width: 25,
    marginLeft: 15
  },
  title: props => ({
    fontSize: props.type === 'default' ? theme.typography.h5.fontSize : theme.typography.body1.fontSize,
    fontWeight: props.type === 'default' ? theme.typography.fontWeightMedium : theme.typography.fontWeightRegular
  }),
  value: props => ({
    fontSize: props.type === 'default' ? theme.typography.h5.fontSize : theme.typography.body1.fontSize,
    marginLeft: props.type === 'default' ? 4 : 15,
    fontWeight: theme.typography.fontWeightMedium
  })
}))

const Tab = ({ title, value, textColor, bgColor, type = 'default', roundedSide = 'topRounded', icon }) => {
  const classes = useStyles({ textColor, bgColor, type })
  return (
    <Typography className={clsx(classes.tab, classes[type], classes[roundedSide])} align={'center'}
      component={'span'}>
      <span className={clsx(classes.title)}>{title}: </span>
      <span className={clsx(classes.value)}>{value}</span>
      {icon ? <span className={classes.icon}><Icon type={icon}/></span> : null}
    </Typography>
  )
}

Tab.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  textColor: PropTypes.string,
  fontSize: PropTypes.string,
  bgColor: PropTypes.string,
  type: PropTypes.oneOf(['default', 'withIcon']),
  roundedSide: PropTypes.oneOf(['topRounded', 'bottomRounded']),
  icon: PropTypes.string
}

export default Tab
