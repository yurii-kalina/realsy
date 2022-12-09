import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme) => ({
  button: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #CDCDCD',
    boxSizing: 'border-box',
    color: '#000000'
  },
  error: {
    borderColor: theme.palette.error.main
  },
  small: {
    width: 24,
    height: 24,
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
  active: {
    border: 'none',
    backgroundColor: theme.palette.primary.main,
    color: 'white'
  },
  activeText: {
    color: 'white'
  }
}))
