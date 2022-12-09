import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sliceStatus } from '../../../../store/sliceStatus'
import Error from '../../../Error'
import Loading from '../../../Loading'
import LargeIconButton from '../../../common/buttons/LargeIconButton'
import { useTranslation } from 'react-i18next'
import { getSubmissionPropertyCategory } from '../../../../store/submission/selectors'
import { getPropertyCategories } from '../../../../store/configuration/selectors'
import { setSubmissionPropertyCategory } from '../../../../store/submission/slice'
import { makeStyles } from '@material-ui/core/styles'
import { fetchPropertyCategoryConfigurations } from '../../../../store/configuration/thunks'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(7.5)
  },
  fields: {
    marginTop: theme.spacing(1.8),
    marginLeft: theme.spacing(10),
    '&:first-child': {
      marginLeft: 0
    },
    '&:nth-child(4n)': {
      marginRight: 0
    },
    '&:nth-child(5n)': {
      marginLeft: 0
    }
  }
}))

const PropertyCategories = props => {
  const classes = useStyles()
  const { status, error, items } = useSelector(getPropertyCategories)
  const propertyCategory = useSelector(getSubmissionPropertyCategory)
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const scrollBottomRef = useRef(null)

  useEffect(() => {
    if (items && items.length > 0 && scrollBottomRef.current) {
      scrollBottomRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [items])

  const handleClick = (item) => {
    if (item !== propertyCategory) {
      dispatch(setSubmissionPropertyCategory(item))
      dispatch(fetchPropertyCategoryConfigurations(item))
    }
  }

  return (
    <Grid spacing={4} container className={classes.container} ref={scrollBottomRef}>
      {status === sliceStatus.FAILED ? <Error error={error}/> : null}
      {status === sliceStatus.LOADING ? <Loading/> : null}
      {status === sliceStatus.SUCCEEDED && items && items.length > 0
        ? items.map(item => (
          <Grid item sm={3} key={item.id}>
            <LargeIconButton
              name={t(`propertyCategory.${item.name}`)}
              iconName={item.icon}
              isActive={propertyCategory && propertyCategory.id === item.id}
              onClick={() => handleClick(item)}
            />
          </Grid>))
        : null}

    </Grid>
  )
}

export default PropertyCategories
