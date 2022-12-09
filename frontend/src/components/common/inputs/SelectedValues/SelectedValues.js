import React from 'react'
import { useStyles } from './styles'
import Box from '@material-ui/core/Box'
import PropTypes from 'prop-types'
import SimpleFormButton from '../../buttons/SimpleFormButton'
import { useTheme } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'

const SelectedValues = ({ value, count, onClick, isFullWidth, children, width }) => {
  const classes = useStyles({ isFullWidth, width })
  const theme = useTheme()

  return (
    <Box display={'flex'} className={classes.selectedContainer}>
      {value
        ? <SimpleFormButton
          text={value}
          icon={'close'}
          iconPosition={'right'}
          textColor={'#000'}
          fontSize={theme.typography.body2.fontSize} size={'small'}
          onClick={onClick}
          iconSize={10}>
          {children}
        </SimpleFormButton>
        : null}
      {
        count > 0
          ? <Typography variant={'body1'} component={'span'}
            className={classes.count}>{`+${count}`}</Typography>
          : null
      }
    </Box>
  )
}

SelectedValues.propTypes = {
  isFullWidth: PropTypes.bool,
  onClick: PropTypes.func
}

export default SelectedValues
