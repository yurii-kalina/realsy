import { withStyles } from '@material-ui/core'
import Slider from '@material-ui/core/Slider'

export const GradientSlider = withStyles(theme => ({
  root: {
    background: 'linear-gradient(89deg, rgba(233,52,67,1) 0%, rgba(233,52,67,1) 8%, rgba(255,137,1,1) 25%, rgba(255,154,38,1) 34%, rgba(255,217,93,1) 56%, rgba(255,206,83,1) 64%, rgba(55,233,127,1) 76%, rgba(79,230,122,1) 81%, rgba(31,206,101,1) 87%, rgba(93,228,118,1) 100%)',
    height: 20,
    padding: 0,
    borderRadius: 8,
    boxSizing: 'border-box'
  },
  thumb: {
    height: 65,
    width: 65,
    backgroundColor: theme.palette.primary.main,
    marginTop: -23,
    marginLeft: -32,
    color: 'white',
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit'
    }
  },
  active: {},
  rail: {
    display: 'none'
  },
  mark: {
    display: 'none'
  },
  markLabel: {
    display: 'block',
    width: 36,
    top: -71,
    '&:first-child': {
      left: 5
    }
  }
}))(Slider)
