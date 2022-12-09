import React from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@material-ui/core/styles'
import Popover from '@material-ui/core/Popover'
import Icon from '../../../Icon'
import ButtonBase from '@material-ui/core/ButtonBase'
import InputBase from '@material-ui/core/InputBase'

const useStyles = makeStyles(theme => ({
  input: props => ({
    maxWidth: props.maxWidth || 195,
    height: 40,
    marginTop: theme.spacing(1.25),
    marginBottom: theme.spacing(1.25),
    padding: `${theme.spacing(1.375)}px ${theme.spacing(3)}px`,
    borderRadius: 8,
    background: '#EEEFF1',
    boxSizing: 'border-box',
    fontSize: theme.typography.body2.fontSize
  }),
  button: {
    marginLeft: theme.spacing(5.25),
    color: theme.palette.text.primary,
    fontSize: theme.typography.body2.fontSize,
    textTransform: 'capitalize',
    '&::hover': {
      background: 'transparent'
    }
  },
  arrow: props => ({
    marginLeft: theme.spacing(1.25),
    padding: 1,
    transform: props.open ? 'rotate(180deg)' : 'initial'
  }),
  popover: {
    padding: theme.spacing(2.5),
    borderRadius: '0px 0px 10px 10px'
  }
}))
const Range = ({ values, unit, name }) => {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const classes = useStyles({ open })
  const id = open ? 'simple-popover' : undefined
  const { t } = useTranslation()
  return (
    <>
      <ButtonBase className={classes.button} disableRipple aria-describedby={id} onClick={handleClick}>
        {t(name)}
        <Box component='span' display='block' width={18} className={classes.arrow}>
          <Icon type='arrowDown'/>
        </Box>
      </ButtonBase>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        PaperProps={{
          className: classes.popover
        }}
      >
        {values && values.length > 0 && values.map(value => (
          <div key={value.id}>
            <Typography variant='body2'>
              {t(value.valueText)}
            </Typography>
            <InputBase className={classes.input} variant='outlined' placeholder={unit}/>
          </div>
        ))}
      </Popover>
    </>
  )
}

export default Range