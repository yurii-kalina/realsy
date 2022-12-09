import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  container: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  checkbox: props => ({
    display: 'flex',
    alignItems: 'center',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: props.checkboxColor || '#CDCDCD',
    boxSizing: 'border-box'
  }),
  small: {
    width: 24,
    height: 24,
    padding: 5,
    borderRadius: 4
  },
  medium: {
    width: 40,
    height: 40,
    borderRadius: 4
  },
  large: {
    width: 50,
    height: 50,
    padding: 10,
    borderRadius: 8
  },
  custom: props => ({
    width: props.width,
    height: props.height,
    borderRadius: 4
  }),
  active: props => ({
    border: 'none',
    backgroundColor: props.activeColor || props.checkboxColor || theme.palette.primary.main,
    color: 'white'
  }),
  topRight: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 7
  },
  label: props => ({
    display: 'block',
    minWidth: 0,
    color: props.textColor || theme.palette.text.primary,
    marginLeft: theme.spacing(2),
    textTransform: 'capitalize',
    fontSize: props.fontSize || theme.typography.body2.fontSize
  })
}))
