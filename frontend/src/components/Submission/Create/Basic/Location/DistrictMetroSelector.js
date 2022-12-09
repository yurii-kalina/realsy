import React, { useState } from 'react'
import Box from '@material-ui/core/Box'
import SimpleFormButton from '../../../../common/buttons/SimpleFormButton'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../../../../Loading'
import Error from '../../../../Error'
import { sliceStatus } from '../../../../../store/sliceStatus'
import { setSubmissionDistrict, setSubmissionDistricts, setSubmissionMetros } from '../../../../../store/submission/slice'
import DistrictValues from './DistrictValues'
import { makeStyles } from '@material-ui/core/styles'
import MapView from '../../../../Map/MapView'
import ExactAddress from './ExactAddress'
import Grid from '@material-ui/core/Grid'
import { getCity } from '../../../../../store/location/selectors'
import { getSubmissionLocation } from '../../../../../store/submission/selectors'
import { useRouteMatch } from 'react-router-dom'
import { Paths } from '../../../../../constants'

import MetroValues from './MetroValues'

const useStyles = makeStyles(theme => ({
  mapContainer: {
    '& > .leaflet-container': {
      height: 400,
      marginTop: 30,
      borderRadius: 30
    }
  }
}))

const DistrictMetroSelector = () => {
  const classes = useStyles()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const match = useRouteMatch('/:path')

  const [locationType, setShowLocationType] = useState('')

  const { item: city, status, error } = useSelector(getCity)
  const { districts, metros } = useSelector(getSubmissionLocation)

  const handleDistrictSelection = (name) => {
    if (name === 'all') {
      dispatch(setSubmissionDistricts({ name: 'all', values: city.districts }))
    } else {
      if (match && (match.url === Paths.AD || match.url === Paths.SEARCH)) {
        dispatch(setSubmissionDistricts(name))
      } else {
        dispatch(setSubmissionDistrict(name))
      }
    }
  }

  const handleMetroSelection = (name) => {
    dispatch(setSubmissionMetros(name))
  }

  return (
    <Box>
      <Grid container spacing={4}>
        <Grid container justify={'center'} item sm={4}>
          <SimpleFormButton
            text={t('district')}
            variant={'bordered'}
            activeVariant={'default'}
            isActive={locationType === 'district'}
            onClick={() => setShowLocationType('district')}/>
        </Grid>
        <Grid container justify={'center'} item sm={4}>
          <SimpleFormButton
            text={t('metro')}
            variant={'bordered'}
            activeVariant={'default'}
            isActive={locationType === 'metros'}
            onClick={() => setShowLocationType('metros')}/>
        </Grid>
        <Grid container justify={'center'} item sm={4}>
          <SimpleFormButton
            text={t('exactAddress')}
            variant={'bordered'}
            activeVariant={'default'}
            isActive={locationType === 'exact'}
            onClick={() => setShowLocationType('exact')}/>
        </Grid>
      </Grid>
      <Box mt={1.75}>
        {status === sliceStatus.FAILED && <Error error={error}/>}
        {status === sliceStatus.LOADING && <Loading/>}
        {status === sliceStatus.SUCCEEDED &&
                <>
                  {(city && city.districts && city.districts.length > 0) &&
                    <Box justifyContent={'space-between'} flexWrap={'wrap'}
                      display={locationType === 'district' ? 'flex' : 'none'}>
                      <DistrictValues selected={districts} items={city.districts}
                        handleSelect={handleDistrictSelection}
                        selectAllText={t('districts.allDistricts')}/>
                    </Box>}
                  <Box justifyContent={'space-between'} flexWrap={'wrap'}
                    display={locationType === 'metros' ? 'flex' : 'none'}>
                    <MetroValues selectAllText={t('allDistricts')} selected={metros} items={city.metros}
                      handleSelect={handleMetroSelection}/>
                  </Box>
                  <Box width={1} display={locationType === 'exact' ? 'box' : 'none'}>
                    <ExactAddress/>
                  </Box>
                </>}
      </Box>
      <Box width={1} heigth={400} className={classes.mapContainer}>
        <MapView/>
      </Box>
    </Box>
  )
}

export default DistrictMetroSelector
