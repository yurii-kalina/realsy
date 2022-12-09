import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useTheme } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { useDispatch, useSelector } from 'react-redux'
import ConfigurationSection from '../../Submission/View/Item/ConfigurationSection'
import Icon from '../../Icon'
import FormSectionLabel from '../../common/labels/FormSectionLabel'
import User from '../../Submission/View/Item/User'
import { useHistory, useParams } from 'react-router-dom'
import { fetchPropertyById } from '../../../store/property/thunks'
import { selectProperty, selectPropertyImages } from '../../../store/property/selectors'
import { sliceStatus } from '../../../store/sliceStatus'
import Error from '../../Error'
import Loading from '../../Loading'
import MapView from '../../Map/MapView'
import { selectUser } from '../../../store/user/selectors'
import PrimaryButton from '../../common/buttons/PrimaryButton'
import PropertyImages from './PropertyImages'
import { ConfigCategory, ConfigTypes, Paths } from '../../../constants'
import clsx from 'clsx'
import { deleteFavorite, sendFavorite } from '../../../store/favorite/thunks'
import { selectFavoritePropertiesIds } from '../../../store/favorite/selectors'

export const useStyles = makeStyles((theme) => ({
  location: {
    margin: 5.5,
    '&: nth-child(3n)': {
      marginRight: 0
    },
    '&:nth-child(3n-2)': {
      marginLeft: 0
    }
  },
  bordered: {
    padding: '0 50px'
  },
  descriptionContainer: {
    padding: '0 50px'
  },
  divider: {
    backgroundColor: '#CDCDCD'
  },
  heading: {
    fontWeight: theme.typography.fontWeightMedium,
    textTransform: 'capitalize'
  },
  description: {
    color: theme.palette.text.darkGray
  },
  capitalize: {
    display: 'inline-block',
    '&::first-letter': {
      textTransform: 'uppercase'
    }
  },
  propertyIconContainer: {
    width: 100,
    height: 100,
    padding: theme.spacing(2.5),
    borderRadius: '50%',
    background: '#EEEFF1'
  },
  container: {
    background: 'url("/adViewBg.png") no-repeat',
    backgroundSize: '100%'
  },
  frame: {
    marginTop: 200,
    padding: '46px 0px',
    borderRadius: theme.modalRadius,
    backgroundColor: 'white',
    boxShadow: theme.boxShadow,
    boxSizing: 'border-box',
    overflow: 'hidden'
  },
  name: {
    fontWeight: theme.typography.fontWeightBold
  },
  gridList: {
    width: 630,
    height: 233
  },
  mapContainer: {
    '& > .leaflet-container': {
      height: 253,
      marginTop: 30,
      borderRadius: 30
    }
  },
  borderedTop: {
    borderTop: '1px solid #CDCDCD'
  },
  borderedBottom: {
    borderBottom: '1px solid #CDCDCD'
  },
  padded: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  }
}))

const PropertyView = ({ property = null, children }) => {
  const history = useHistory()
  const classes = useStyles()
  const { t } = useTranslation()
  const theme = useTheme()
  const { id: path } = useParams()
  const { status: imageStatus } = useSelector(selectPropertyImages)
  const { user: loggedIn } = useSelector(selectUser)
  const { status, error, property: fetchedProperty } = useSelector(selectProperty)
  const { id, price, description, propertyCategory, values, user, location, name, isAvailableForRent, isAvailableForSale, images } = property || fetchedProperty
  const dispatch = useDispatch()

  const [special, setSpecial] = useState([])
  const [basic, setBasic] = useState([])
  const [extra, setExtra] = useState([])
  const [infrastructure, setInfrastructure] = useState([])
  const favoriteProperties = useSelector(selectFavoritePropertiesIds)

  const handleSendFavorite = async () => {
    const index = favoriteProperties.findIndex(item => item === id)
    if (index > -1) {
      await dispatch(deleteFavorite({ propertyId: id }))
    } else await dispatch(sendFavorite({ propertyId: id }))
  }

  useEffect(() => {
    if (values) {
      setSpecial(values.filter(item => item && item.configuration && item.configuration.isSpecial === true))
      setBasic(values.filter(item => !item.isOptional &&
        item.configuration.type.name !== ConfigTypes.DATE &&
        item.configuration.category.name !== ConfigCategory.PRICE &&
        !item.configuration.category.isDetailed &&
        item.configuration.category.name !== ConfigCategory.PERIOD))
      setExtra(values.filter(item => item.configuration.category.isDetailed && item.configuration.category.name !== ConfigCategory.INFRASTRUCTURE))
      setInfrastructure(values.filter(item => item.configuration.category.name === ConfigCategory.INFRASTRUCTURE))
    }
  }, [values])

  useEffect(() => {
    if (+path !== +id && !property) {
      dispatch(fetchPropertyById(path))
    }
  }, [dispatch, id, path, property])

  const getLocation = () => {
    let address = ''
    if (location) {
      if (location.street) {
        address += location.street
      }
      if (location.buildingNumber) {
        if (address.length > 0) {
          address += ', '
        }
        address += location.buildingNumber
      }
      if (location.districts && location.districts[0] && location.districts[0].name) {
        if (address.length > 0) {
          address += ', '
        }
        address += `${t(`districts.${location.districts[0].name}`)} ${t('districts.district')}`
      }
      if (location.city && location.city.name) {
        if (address.length > 0) {
          address += ', '
        }
        address += location.city.name
      }
    }
    return address
  }

  const adTitle = () => {
    let title = ''
    title += propertyCategory && propertyCategory.name ? t(`propertyCategory.${propertyCategory.name}`) : ''
    if (isAvailableForRent && isAvailableForSale) {
      title += ` ${t('forRentAndSale')}`
    } else if (isAvailableForRent) {
      title += ` ${t('forRent')}`
    } else if (isAvailableForSale) {
      title += ` ${t('forSale')}`
    }
    return title
  }

  if (status === sliceStatus.FAILED) {
    return <Error error={error && error.message}/>
  }
  if (status === sliceStatus.LOADING) {
    return <Loading isFullWidth={true}/>
  }
  if (property || status === sliceStatus.SUCCEEDED) {
    return (
      <Grid container justify={'center'} className={classes.container}>
        <Grid item sm={10} className={classes.frame}>
          <Grid>
            <Grid container spacing={2} className={clsx(classes.bordered, classes.padded)}>
              <Grid item sm={7}>
                <Box display='flex' pb={4}>
                  <Box className={classes.propertyIconContainer}>
                    <Icon type={propertyCategory ? propertyCategory.icon : ''}/>
                  </Box>
                  <Box ml={2}>
                    <Typography variant={'body1'} className={classes.name}>
                      {name}
                    </Typography>
                    <Box mt={1.25}>
                      <FormSectionLabel iconSize={16} fontSize={theme.typography.body2.fontSize} component='span'
                        icon='locationFilled' color={theme.palette.text.secondary}
                        text={getLocation()}/>
                    </Box>
                    <Box mt={1.25}>
                      <FormSectionLabel fontSize={theme.typography.body2.fontSize}
                        iconColor={theme.palette.text.lightGray} component='span' icon='money'
                        color={theme.palette.text.secondary}
                        text={`${price} ${price ? t('currency.uah') : ''}`}/>
                    </Box>
                  </Box>
                </Box>
                {(imageStatus === sliceStatus.SUCCEEDED || (images && images.length > 0)) && <PropertyImages name={name} images={images}/> }
                {imageStatus === sliceStatus.LOADING && <Loading/> }
                {children && children.length > 0 && children[0]}
              </Grid>
              <Grid item sm={5}>
                <User user={user}>
                  {loggedIn && loggedIn.phone === user.phone
                    ? <PrimaryButton text={t('search')} icon={'search'} iconPosition={'left'} variant={'bordered'}
                      size={'small'} iconSize={16} iconColor={'#000'} onClick={() => history.push(`${Paths.PROPERTY}/${id}${Paths.AD}`)}/>

                    : <PrimaryButton onClick={handleSendFavorite} text={favoriteProperties.findIndex(item => item === id) > -1 ? t('removeAd') : t('saveAd')} icon={favoriteProperties.findIndex(item => item === id) > -1 ? 'favoriteFilled' : 'favorite'} iconPosition={'left'} variant={'bordered'}
                      size={'small'} iconSize={16} iconColor={'#000'}/>
                  }
                </User>
              </Grid>
            </Grid>
            {children && children.length > 1 && <Grid item sm={12} className={clsx(classes.bordered, classes.borderedTop, classes.padded)}>
              {children[1]}
            </Grid>}
            <Grid item sm={12} className={clsx(classes.bordered, classes.borderedTop, classes.padded)}>
              <Box>
                <FormSectionLabel fontWeight={theme.typography.fontWeightBold} text={adTitle()} color={theme.palette.primary.darkGray}/>
                {special && <ConfigurationSection items={special}/>}
                <Box maxWidth={879} heigth={253} className={clsx(classes.mapContainer)}>
                  <MapView/>
                </Box>
              </Box>
            </Grid>
            <Grid item sm={12} className={clsx(classes.bordered, classes.borderedTop)}>
              { basic && <Box py={6.25}>
                <ConfigurationSection title={t('propertyDetails')}
                  items={basic}
                  itemDivider={';'}
                  color={theme.palette.primary.darkGray} iconColor={theme.palette.primary.main}/>
              </Box>}
            </Grid>
            {((extra && extra.length > 0) || (infrastructure && infrastructure.length > 0)) && <Grid item sm={12} className={classes.bordered}>
              <Box>
                {extra && <ConfigurationSection title={t('extra')}
                  items={extra}
                  itemDivider={';'}
                  color={theme.palette.primary.darkGray} iconColor={theme.palette.primary.main}/>}
                {infrastructure && <Box mt={4}>
                  <ConfigurationSection title={t('infrastructure')}
                    items={infrastructure}
                    itemDivider={';'}
                    color={theme.palette.primary.darkGray} iconColor={theme.palette.primary.main}/>
                </Box>}
              </Box>
            </Grid>}
            {description && description.length > 0 && <Grid item sm={12} className={classes.descriptionContainer}>
              <Box py={6.25}>
                <FormSectionLabel color={theme.palette.primary.darkGray} fontWeight={theme.typography.fontWeightBold}
                  fontSize={theme.typography.body1.fontSize} text={t('description')}/>
                <Box mt={2.5}>
                  <Typography className={classes.description} component={'p'} variant={'body2'}>
                    {description}
                  </Typography>
                </Box>
              </Box>
            </Grid>}
            <Grid container justify='center'>
              <Grid item sm={6}>
                {children}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  } else {
    return null
  }
}

export default PropertyView
