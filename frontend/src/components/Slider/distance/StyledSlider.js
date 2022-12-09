import { withStyles } from '@material-ui/core'
import Slider from '@material-ui/core/Slider'

export const StyledSlider = withStyles(theme => ({
  root: {
    color: '#BDBDBD',
    height: 2,
    padding: '30px 0',
    width: 700
  },
  thumb: {
    display: 'flex',
    alignItems: 'center',
    height: 65,
    width: 65,
    backgroundColor: '#fff',
    marginTop: -32.5,
    marginLeft: -32.5,
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)',
    textAlign: 'center',
    '&:focus, &:hover, &$active': {
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.55)'
    }
  },
  valueLabel: {
    left: 'calc(-50% - 4px)',
    top: -22,
    '& *': {
      background: 'transparent',
      color: '#000',
      display: 'block',
      minWidth: 150,
      fontSize: theme.typography.body2.fontSize
    }
  },
  track: {
    height: 2
  },
  rail: {
    height: 2,
    opacity: 1,
    backgroundColor: '#bdbdbd'
  },
  mark: {
    backgroundColor: '#bdbdbd',
    height: 15,
    width: 1,
    marginTop: -7.5
  },
  markActive: {
    opacity: 1
  },
  active: {}
}))(Slider)
