import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import MapView from './MapView'
import Box from '@material-ui/core/Box'

const useStyles = makeStyles(theme => ({
  mapContainer: {
    '& > .leaflet-container': {
      height: 400,
      marginTop: 30,
      borderRadius: 30
    }
  }
}))
const TestMap = () => {
  const classes = useStyles()
  return (
    <Box width={1} height={400} className={classes.mapContainer}>
      <MapView/>
    </Box>
  )
}

export default TestMap