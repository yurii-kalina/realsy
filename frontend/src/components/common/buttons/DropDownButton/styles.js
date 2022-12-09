import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  button: {
    display: 'flex',
    justifyContent: 'space-between',
    minWidth: 200,
    height: 50,
    padding: '0 20px',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 8,
    borderColor: '#BDBDBD',
    color: theme.palette.text.secondary,
    fontSize: theme.typography.body2.fontSize,
    textAlign: 'left',
    textTransform: 'capitalize'
  },
  icon: {
    display: 'inline-block',
    width: 15,
    color: 'black'
  },
  open: {
    borderWidth: 0,
    backgroundColor: theme.palette.primary.main,
    color: 'white'
  }
}))
