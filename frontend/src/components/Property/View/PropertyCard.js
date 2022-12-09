import React from 'react'
import Box from '@material-ui/core/Box'
import { useTheme, makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'
import FormSectionLabel from '../../common/labels/FormSectionLabel'
import { ViewType } from '../../../constants'
import ButtonBase from '@material-ui/core/ButtonBase'
import Icon from '../../Icon/Icon'

const useStyles = makeStyles(theme => ({
  cardAction: {
    display: 'block',
    width: 18
  }
}))

const PropertyCard = ({ isLiked, handleSendFavorite = () => {}, property = {}, viewType }) => {
  const { propertyCategory, user, location, name, isAvailableForRent, isAvailableForSale, id } = property
  const classes = useStyles()
  const theme = useTheme()
  const { t } = useTranslation()
  const handleLike = async (submissionId) => {
    await handleSendFavorite(submissionId)
  }
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

  const propertyTitle = () => {
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

  return (
    <Box height={173}>
      <Box display='flex' justifyContent='space-between' flexWrap='wrap' pt={viewType === ViewType.TILE ? 1.8 : 1.5} pb={1}>
        <Box width={1} py={0.5} display={'flex'} flexWrap={'wrap'} justifyContent={'space-between'}>
          <FormSectionLabel
            overflow='ellipsis'
            text={propertyTitle()}
            fontSize={theme.typography.body1.fontSize}
            fontWeight={theme.typography.fontWeightBold}/>
          {viewType === ViewType.ROW && <Box display='flex' justifyContent='space-between'>
            <ButtonBase disableRipple className={classes.cardAction} onClick={() => handleLike(id)}>
              {isLiked ? <Icon type={'favoriteFilled'} size={21}/> : <Icon type={'favorite'} size={19}/>}
            </ButtonBase>
          </Box>}
        </Box>
        <Box py={0.5} display={'flex'} flexWrap={'wrap'} flexBasis='100%'>
          <FormSectionLabel
            text={user && user.fullName}
            fontSize={theme.typography.body2.fontSize}
            fontWeight={theme.typography.fontWeightBold}/>
        </Box>
        <Box py={0.5} display={'flex'} flexWrap={'wrap'} flexBasis='100%'>
          <FormSectionLabel
            text={name}
            color={theme.palette.text.secondary}
            fontSize={theme.typography.body2.fontSize}
            fontWeight={theme.typography.fontWeightBold}/>
        </Box>

        <Box py={0.5} display={'flex'} flexWrap={'wrap'} flexBasis='100%'>
          <FormSectionLabel
            iconSize={16}
            fontSize={theme.typography.subtitle1.fontSize}
            component='span'
            icon='locationFilled'
            color={theme.palette.text.darkGray}
            text={getLocation()}/>
        </Box>
        {/* <Box py={0.5} display={'flex'} flexWrap={'wrap'} flexBasis='100%'>
          <FormSectionLabel
            fontSize={theme.typography.subtitle1.fontSize}
            iconColor={theme.palette.text.lightGray}
            component='span' icon='money'
            color={theme.palette.text.darkGray}
            text={`${price} ${t('currency.uah')}`}/>
        </Box> */}
      </Box>
    </Box>
  )
}

export default PropertyCard
