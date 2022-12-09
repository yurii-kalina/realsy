import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  // default
  button: props => ({
    display: 'flex',
    position: 'relative',
    justifyContent: 'space-around',
    padding: theme.buttonPadding,
    borderRadius: 8,
    fontSize: props.fontSize || theme.typography.body1.fontSize,
    fontWeight: props.fontWeight || 400,
    textTransform: 'capitalize'
  }),
  // size
  large: {
    minWidth: 250,
    height: 50
  },
  medium: {
    minWidth: 200,
    height: 50
  },
  small: {
    minWidth: 195,
    height: 40
  },
  smaller: {
    minWidth: 189,
    height: 40
  },
  // variants
  default: props => ({
    backgroundColor: '#EEEFF1',
    color: props.textColor || theme.palette.text.secondary
  }),
  bordered: props => ({
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#BDBDBD',
    backgroundColor: 'white',
    color: props.textColor || theme.palette.text.secondary,
    fontSize: theme.typography.body2.fontSize,
    textTransform: 'none'
  }),
  // state
  activeDefault: props => ({
    borderWidth: 0,
    backgroundColor: props.activeBgColor || theme.palette.primary.main,
    color: 'white'
  }),
  text: {
    padding: '0 5px',
    margin: 'auto',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  },
  activeBordered: props => ({
    borderColor: theme.palette.primary.main,
    backgroundColor: 'rgba(45, 172, 253, .15)',
    color: theme.palette.primary.main
  }),
  // icon
  icon: props => ({
    display: 'flex',
    position: props.iconPosition === 'flex',
    width: props.iconSize || 20
    /*    left: props.iconPosition === 'left' ? 16 : 'initial',
            right: props.iconPosition === 'right' ? 16 : '-10px',
            top: 'initial' */
  })
  /*  iconLeft: {
        left: 16
      },
      iconRight: {
        right: 16
      }, */
  /*  activeIcon: props => ({
          right: props.iconPosition === 'left' ? 16 : 'initial',
          left: props.iconPosition === 'right' ? 16 : 'initial'
        }) */
}))
