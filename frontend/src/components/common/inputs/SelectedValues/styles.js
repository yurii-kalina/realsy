import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
  selectedContainer: props => ({
    padding: theme.buttonPadding,
    paddingBottom: 9,
    borderBottom: theme.border,
    overflow: 'hidden'
  }),
  count: {
    display: 'block',
    width: 40,
    height: 40,
    marginLeft: theme.spacing(2),
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#EEEFF1',
    fontSize: theme.typography.body2.fontSize,
    textAlign: 'center',
    boxSizing: 'border-box'
  }
}))
