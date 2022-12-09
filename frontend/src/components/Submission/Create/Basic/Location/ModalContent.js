import React, { Suspense, useEffect } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import MenuItem from '@material-ui/core/MenuItem'
import { useDispatch, useSelector } from 'react-redux'
import { setSubmissionCity } from '../../../../../store/submission/slice'
import Typography from '@material-ui/core/Typography'
import { useTranslation } from 'react-i18next'
import ButtonBase from '@material-ui/core/ButtonBase'
import Icon from '../../../../Icon'
import clsx from 'clsx'
import { Select } from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl'
import Grid from '@material-ui/core/Grid'
import { getSubmissionLocation } from '../../../../../store/submission/selectors'
import { getLocation } from '../../../../../store/location/selectors'
import { sliceStatus } from '../../../../../store/sliceStatus'
import { fetchCities, fetchCity } from '../../../../../store/location/thunks'
import Loading from '../../../../Loading'
import Error from '../../../../Error'

const DistrictMetroSelector = React.lazy(() => import('./DistrictMetroSelector'))

const useStyles = makeStyles(theme => ({
  title: {
    margin: '0 auto',
    padding: '30px 0',
    color: theme.palette.text.darkGray
  },
  close: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    width: 16,
    height: 16,
    color: theme.palette.text.light,
    cursor: 'pointer'
  },
  input: {
    width: 200,
    height: 50,
    borderRadius: '8px !important',
    color: theme.palette.text.secondary,
    fontSize: theme.typography.body2.fontSize,
    textAlign: 'center',
    '& .MuiSelect-select:focus': {
      backgroundColor: 'transparent'
    },
    '& .MuiOutlinedInput-input': {
      padding: '13.5px 14px'
    },
    '& .MuiSelect-iconOutlined': {
      right: '12px !important'
    }
  }
}))

const SelectIcon = (props) => (
  <span {...props} style={{ width: 16 }}><Icon isUnClickable={true} type={'arrowDown'}/></span>
)

const ModalContent = ({ handleModalClose }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const { city: adCity } = useSelector(getSubmissionLocation)
  const { cities, city } = useSelector(getLocation)

  useEffect(() => {
    if (cities.status === sliceStatus.IDLE && cities.items && cities.items.length === 0) {
      dispatch(fetchCities())
    }
  }, [cities.items, dispatch, cities.status])

  useEffect(() => {
    if (adCity && city.item && city.item.id !== adCity.id) {
      dispatch(fetchCity(adCity.id))
    }
  }, [adCity, city.item, dispatch])

  const cityList = () => (cities.items.map(cityItem => <MenuItem key={cityItem.id}
    value={cityItem.id}>{t(`cities.${cityItem.name}`)}</MenuItem>))

  return (
    <Grid container justify={'center'}>
      <ButtonBase className={classes.close} onClick={handleModalClose}>
        <Icon type={'close'}/>
      </ButtonBase>
      {cities.status === sliceStatus.LOADING && <Loading/>}
      {cities.status === sliceStatus.FAILED && <Error/>}
      {cities.status === sliceStatus.SUCCEEDED &&
            <Grid container justify={'center'} item sm={12}>
              <Grid item sm={12}>
                <Box mt={2} display={'flex'} justifyContent={'center'}>
                  <FormControl className={classes.formControl}>
                    <Select
                      className={clsx(classes.input)}
                      value={adCity && adCity.id} onChange={(e) => dispatch(setSubmissionCity(e.target))}
                      name={'city'} id={'city'}
                      variant={'outlined'}
                      inputProps={{ 'aria-label': 'Without label' }}
                      IconComponent={SelectIcon}
                    >
                      {cityList()}
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item sm={12}>
                <Typography className={classes.title} component={'div'} variant={'body2'} align={'center'}
                  color={'textSecondary'}>
                  {t('chooseLocationType')}
                </Typography>
              </Grid>
              <Grid item sm={12}>
                <Suspense fallback={<Loading isFullWidth={true}/>}>
                  <DistrictMetroSelector/>
                </Suspense>
              </Grid>

            </Grid>}
    </Grid>
  )
}

ModalContent.propTypes = {
  handleModalClose: PropTypes.func
}

export default ModalContent
