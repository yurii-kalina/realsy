import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  button: props => ({
    width: props.width,
    height: props.height,
    padding: theme.buttonPadding,
    borderRadius: 8,
    fontSize: props.fontSize || theme.typography.body1.fontSize,
    fontWeight: props.fontWeight || theme.fontWeightMedium,
    textTransform: 'capitalize',
    boxSizing: 'border-box',
    background: props.background
  }),
  default: props => ({
    background: props.background || theme.palette.secondary.main,
    color: props.color || 'white'
    /*    '&:hover': {
          background: 'inherit'
        } */
  }),
  bordered: props => ({
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: props.color || '#000',
    background: 'transparent',
    color: props.color || '#000'
  }),
  icon: props => ({
    display: 'flex',
    alignItems: 'center',
    fontSize: '1rem',
    width: props.iconSize || 25,
    marginRight: props.iconPosition === 'left' ? theme.spacing(2) : 0,
    marginLeft: props.iconPosition === 'right' ? theme.spacing(2) : 0
  }),
  small: {
    minWidth: 200,
    height: 50
  },
  medium: {
    minWidth: 235,
    height: 65
  },
  narrow: {
    width: 217,
    height: 55
  }
}))
