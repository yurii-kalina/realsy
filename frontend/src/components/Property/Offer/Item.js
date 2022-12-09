import React from 'react'
import Box from '@material-ui/core/Box'
import Icon from '../../Icon'
import Typography from '@material-ui/core/Typography'
import FormSectionLabel from '../../common/labels/FormSectionLabel'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@material-ui/core'
import Link from '@material-ui/core/Link'
import Checkbox from '../../common/buttons/Checkbox'

const useStyles = makeStyles(theme => ({
  name: {
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.text.primary
  },
  propertyIconContainer: {
    width: 80,
    height: 80,
    padding: theme.spacing(2),
    borderRadius: '50%',
    background: '#EEEFF1'
  },
  link: {
    display: 'flex',
    justifyContent: 'space-between',
    cursor: 'pointer',
    padding: theme.spacing(1),
    borderBottom: '1px solid #CDCDCD',
    '&:hover': {
      background: '#fafafa'
    }
  }
}))
const Item = ({ item, onClick, isActive }) => {
  const classes = useStyles()
  const { propertyCategory, location, name, price } = item
  const theme = useTheme()
  const { t } = useTranslation()
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

  return (
    <Link className={classes.link} underline='none' onClick={() => onClick(item.id)}>
      <Box display='flex' justifyContent='space-between'>
        <Box className={classes.propertyIconContainer}>
          <Icon type={propertyCategory ? propertyCategory.icon : ''}/>
        </Box>
        <Box ml={2}>
          <Typography variant={'body2'} className={classes.name}>
            {name}
          </Typography>
          <Box mt={1.25}>
            <FormSectionLabel iconSize={16} fontSize={theme.typography.subtitle1.fontSize} component='span'
              icon='locationFilled' color={theme.palette.text.secondary}
              text={getLocation()}/>
          </Box>
          <Box mt={1.25}>
            <FormSectionLabel fontSize={theme.typography.subtitle1.fontSize}
              iconColor={theme.palette.text.lightGray} component='span' icon='money'
              color={theme.palette.text.secondary}
              text={`${price} ${price ? t('currency.uah') : ''}`}/>
          </Box>
        </Box>
      </Box>
      <Checkbox textColor={theme.palette.text.secondary} position='right' size={'small'} onClick={onClick}
        isActive={isActive}/>

    </Link>
  )
}

export default Item