import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  label: {
    marginTop: theme.spacing(2),
    textTransform: 'capitalize'
  },
  button: {
    flexWrap: 'wrap',
    width: 200,
    color: theme.palette.text.darkGray,
    overflow: 'hidden'
  },
  iconContainer: {
    position: 'relative',
    width: '100%',
    height: 100,
    border: theme.border,
    borderRadius: 8
  },
  activeButton: {
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.fadedBlue
  },
  activeLabel: {
    color: theme.palette.primary.main
  },
  selectedIcon: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 20,
    height: 20
  },
  icon: props => ({
    display: 'flex',
    width: props.iconSize || 75,
    overflow: 'hidden'
  }),
  checkbox: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 24,
    height: 24,
    padding: 4.5,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 4,
    borderColor: '#CDCDCD',
    boxSizing: 'border-box'
  },
  activeCheckbox: {
    borderWidth: 0,
    backgroundColor: theme.palette.primary.main
  }
}))
