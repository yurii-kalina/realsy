import React, { useEffect } from 'react'
import Box from '@material-ui/core/Box'
import FormSectionLabel from '../../../common/labels/FormSectionLabel'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { getPropertyType } from '../../../../store/configuration/selectors'
import Error from '../../../Error'
import { fetchPropertyCategories, fetchPropertyTypes } from '../../../../store/configuration/thunks'
import { setSubmissionPropertyType } from '../../../../store/submission/slice'
import { sliceStatus } from '../../../../store/sliceStatus'
import Loading from '../../../Loading'
import SimpleFormButton from '../../../common/buttons/SimpleFormButton'
import { useTheme } from '@material-ui/core'
import { getSubmissionPropertyType } from '../../../../store/submission/selectors'

const PropertyType = () => {
  const { status, error, items } = useSelector(getPropertyType)
  const propertyType = useSelector(getSubmissionPropertyType)

  const dispatch = useDispatch()
  const { t } = useTranslation()
  const theme = useTheme()

  useEffect(() => {
    if (items && items.length === 0) {
      dispatch(fetchPropertyTypes())
    }
  }, [dispatch, items])

  const handleClick = (item) => {
    dispatch(setSubmissionPropertyType(item))
    dispatch(fetchPropertyCategories(item))
  }

  return (
    <Box mt={7.5}>
      <FormSectionLabel text={`${t('property')}:`} icon={'house'} fontWeight={theme.typography.fontWeightMedium}
        fontSize={theme.typography.body1.fontSize}/>
      {status === sliceStatus.FAILED ? <Error error={error}/> : null}
      {status === sliceStatus.LOADING ? <Loading/> : null}
      {status === sliceStatus.SUCCEEDED
        ? <Box mt={6.25} display={'flex'} justifyContent={'space-around'} mx={5}
          my={2.3}>
          {items && items.length > 0 ? items.map(item => (
            <SimpleFormButton key={item.id} size={'large'} text={t(item.name)}
              onClick={() => handleClick(item)}
              isActive={propertyType && propertyType.id === item.id}/>
          ))
            : null}
        </Box>
        : null}
    </Box>
  )
}

export default PropertyType
