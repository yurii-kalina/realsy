import React from 'react'
import { useTheme } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Icon from '../../../Icon'
import Typography from '@material-ui/core/Typography'
import clsx from 'clsx'
import ButtonBase from '@material-ui/core/ButtonBase'
import { useStyles } from './styles'
import PropTypes from 'prop-types'

const LargeIconButton = ({ name, iconName, onClick, isActive = false, type = 'default', iconSize }) => {
  const classes = useStyles({ iconSize })
  const theme = useTheme()
  return (
    <ButtonBase onClick={onClick} disableRipple className={classes.button}>
      <Box display={'flex'} alignItems={'flex-end'} justifyContent={'center'}
        className={clsx(classes.iconContainer, { [classes.activeButton]: isActive })}>
        {type === 'checkbox'
          ? <span className={clsx(classes.checkbox, { [classes.activeCheckbox]: isActive })}>
            <Icon type={'checked'}/>
          </span> : null}
        <Box className={classes.icon}>
          <Icon type={iconName} color={isActive ? theme.palette.primary.main : undefined}
            secondary={isActive ? 'rgba(45, 172, 253, 0.3)' : undefined}/>
        </Box>
        {type !== 'checkbox' && isActive
          ? <Box className={classes.selectedIcon}><Icon type={'selected'}/></Box> : null}
      </Box>
      <Typography variant={'body2'} component={'span'}
        className={clsx(classes.label)}>{name}</Typography>
    </ButtonBase>
  )
}

LargeIconButton.propTypes = {
  name: PropTypes.string,
  iconName: PropTypes.string,
  onClick: PropTypes.func,
  isActive: PropTypes.bool,
  type: PropTypes.oneOf(['default', 'checkbox'])
}

export default LargeIconButton
