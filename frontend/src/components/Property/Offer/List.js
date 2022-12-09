import React, { useEffect, useState } from 'react'
import { selectProperties, selectProperty } from '../../../store/property/selectors'
import { selectProposition } from '../../../store/propositions/selectors'
import Box from '@material-ui/core/Box'
import Item from './Item'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import PrimaryButton from '../../common/buttons/PrimaryButton'
import { useTranslation } from 'react-i18next'
import { sendProposition } from '../../../store/propositions/thunks'
import { sliceStatus } from '../../../store/sliceStatus'
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'
import Icon from '../../Icon'
import { fetchUserProperties } from '../../../store/property/thunks'
import Loading from '../../Loading'

const useStyles = makeStyles(theme => ({
  loading: {
    marginTop: theme.spacing(0.4),
    padding: theme.spacing(1.25),
    color: 'white'
  }
}))
const List = ({ onClick, adId }) => {
  const classes = useStyles()
  const { t } = useTranslation()
  const { properties, status: propertiesStatus } = useSelector(selectProperties)
  const { property } = useSelector(selectProperty)

  const dispatch = useDispatch()
  const [selected, setSelected] = useState(null)
  const { status } = useSelector(selectProposition)
  const handleSelect = (id) => {
    setSelected(id)
  }
  const handleSubmit = () => {
    dispatch(sendProposition({ propertyId: selected, adId: adId }))
  }

  useEffect(() => {
    if (properties.length <= 0) {
      dispatch(fetchUserProperties())
    }
  }, [dispatch, properties])

  return (
    <Box p={2}>
      {propertiesStatus === sliceStatus.LOADING && <Loading/>}
      {property && property.id && <Box>
        <Item isActive={selected === property.id} item={property} onClick={handleSelect}/>
        {selected === property.id && <Box mt={2} display='flex' justifyContent='center'>
          <PrimaryButton text={t('send')} size='small' onClick={handleSubmit}>
            {status === sliceStatus.LOADING &&
                        <span className={classes.loading}>
                          <CircularProgress color={'inherit'} size={20}/>
                        </span>
            }
            {status === sliceStatus.SUCCEEDED &&
                        <span className={classes.loading}>
                          <Icon type={'checked'} color={'inherit'} size={20}/>
                        </span>
            }
          </PrimaryButton>
        </Box>}
      </Box>}

      {properties && properties.length > 0 && properties.filter(item => property && item.id !== property.id)
        .map(item => <Box key={item.id}>
          <Item isActive={selected === item.id} onClick={handleSelect}
            item={item}/>
          {selected === item.id && <Box mt={2} display='flex' justifyContent='center'>
            <PrimaryButton text={t('send')} size='small' onClick={handleSubmit}>
              {status === sliceStatus.LOADING &&
                            <span className={classes.loading}>
                              <CircularProgress color={'white'} size={20}/>
                            </span>
              }
              {status === sliceStatus.SUCCEEDED &&
                            <span className={classes.loading}>
                              <Icon type={'checked'} color={'white'} size={20}/>
                            </span>
              }
            </PrimaryButton>
          </Box>}
        </Box>)}

    </Box>
  )
}

export default List