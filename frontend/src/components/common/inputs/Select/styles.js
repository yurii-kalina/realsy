import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
  input: props => ({
    position: 'relative',
    minWidth: props.width || 200,
    height: props.height || 50,
    maxWidth: props.maxWidth,
    fontSize: theme.typography.body2.fontSize,
    textTransform: 'capitalize',
    borderRadius: '8px !important',
    '& .MuiOutlinedInput-root': {
      padding: '0 30px'
    },
    '& .MuiSelect-select:focus': {
      backgroundColor: 'transparent'
    },
    '& .MuiSelect-icon': {
      width: 27,
      position: 'relative',
      top: 'initial',
      right: 'initial'
    },
    '& .MuiSelect-outlined.MuiSelect-outlined': {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      padding: theme.buttonPadding
    }
  }),
  selectPlaceholder: {
    color: theme.palette.text.secondary
  }
}))
