import React from 'react'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { ViewType } from '../../../constants'
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
  card: props => ({
    display: props.viewType === ViewType.TILE ? 'block' : 'flex',
    justifyContent: 'center',
    width: '100%',
    height: props.viewType === ViewType.TILE ? 403 : 226,
    borderRadius: 10,
    boxShadow: '0px 0px 15px rgba(45, 172, 253, .25)',
    '&:hover': {
      boxShadow: '0px 0px 15px rgba(45, 172, 253, .45)'
    },
    overflow: 'hidden'
  }),
  background: props => ({
    position: 'relative',
    borderRadius: props.viewType === ViewType.TILE ? 0 : 8,
    margin: props.viewType === ViewType.ROW ? `${theme.spacing(1.5)}px 0px ${theme.spacing(1.5)}px ${theme.spacing(1.5)}px` : 0,
    height: props.viewType === ViewType.TILE ? 180 : 202,
    width: props.viewType === ViewType.TILE ? 'inherit' : 285,
    background: 'url(/cardBg.png) no-repeat',
    backgroundSize: '100% 100%'
  }),
  divider: {
    backgroundColor: '#CDCDCD'
  },
  avatar: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: 130,
    height: 130,
    margin: 'auto',
    '& .MuiAvatar-img': {
      width: 'initial',
      height: 'initial'
    }
  },
  date: {
    alignSelf: 'flex-end',
    marginBottom: 7,
    marginLeft: 21,
    color: 'white',
    fontSize: '.875rem',
    '&::first-letter': {
      textTransform: 'uppercase'
    }
  },
  vip: {
    display: 'block',
    alignSelf: 'flex-end',
    width: 60,
    justifySelf: 'flex-end'
  },
  like: {
    width: 20
  },
  rangeSpan: {
    color: '#BDBDBD',
    textTransform: 'lowercase'
  },
  unit: {
    fontSize: '.8rem'
  },
  plus: {
    padding: `0px ${theme.spacing(1)}px`,
    color: theme.palette.text.lightGray
  },
  cardAction: {
    display: 'block',
    width: 18
  },
  addNewLabel: {
    color: theme.palette.text.primary,
    textAlign: 'center'
  },
  circle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: '50%',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.palette.text.primary
  }
}))

const EmptyCard = ({ text, viewType }) => {
  const classes = useStyles({ viewType })
  return (
    <Box className={classes.card}>
      <Box display='flex' justifyContent='center' alignContent='center' flexWrap='wrap' height='100%'>
        <Box flexBasis='80%'>
          <Typography variant='body1' className={classes.addNewLabel}>
            {text}
          </Typography>
        </Box>
        <Box mt={2} display='flex' justifyContent='center' alignItems='center' flexBasis='100%'>
          <Box display='flex' justifyContent='center' alignItems='center'>
            <Typography variant='h4' className={clsx(classes.addNewLabel, classes.circle)}>
                            +
            </Typography>
          </Box>
        </Box>
      </Box>

    </Box>
  )
}

export default EmptyCard
