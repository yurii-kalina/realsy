import React from 'react'
import Box from '@material-ui/core/Box'
import { useTranslation } from 'react-i18next'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import format from 'date-fns/format'
import ConfigValue from './ConfigValue'
import { uk } from 'date-fns/locale'
import FormSectionLabel from '../../../common/labels/FormSectionLabel'
import { ConfigTypes } from '../../../../constants'

const useStyles = makeStyles(theme => ({
  heading: {
    fontWeight: theme.typography.fontWeightBold,
    textTransform: 'capitalize'
  },
  rangeSpan: {
    color: '#BDBDBD',
    textTransform: 'lowercase'
  },
  unit: {
    fontSize: '1rem'
  }
}))
const ConfigurationSection = ({ title, items, children, icon, color, textDivider }) => {
  const classes = useStyles()
  const { t } = useTranslation()
  const theme = useTheme()

  const getConfigValue = (item) => {
    if (item && item.configuration && item.configuration && item.configuration.type) {
      switch (item.configuration.type.name) {
        case ConfigTypes.PRIORITY:
        case ConfigTypes.PRIORITY_SLIDER:
        case ConfigTypes.SELECT:
        case ConfigTypes.TIME:
        case ConfigTypes.DISTANCE:
          return t(item.configurationValue && item.configurationValue.valueText)
        case ConfigTypes.CHECK:
          return t(item.configuration.name)
        case ConfigTypes.RANGE:
          if (item.numberFrom && item.numberTo) {
            return (
              <span>
                <span className={classes.rangeSpan}>{`${t('from')} `}</span>
                {item.numberFrom}{item.configuration.unit &&
                            <span className={classes.unit}>{item.configuration.unit}</span>}
                <span className={classes.rangeSpan}>{` ${t('to')} `}</span>
                {item.numberTo}{item.configuration.unit &&
                            <span className={classes.unit}>{item.configuration.unit}</span>}
              </span>)
          } else if (item.numberFrom) {
            return (
              <span>
                <span className={classes.rangeSpan}>{`${t('from')} `}</span>
                {item.numberFrom}{item.configuration.unit &&
                            <span className={classes.unit}>{item.configuration.unit}</span>}
              </span>)
          } else if (item.numberTo) {
            return (
              <span>
                <span className={classes.rangeSpan}>{`${t('to')} `}</span>
                {item.numberTo}
                {item.configuration.unit &&
                                <span className={classes.unit}>{item.configuration.unit}</span>}
              </span>)
          } else if (item.valueNumber) {
            return (
              <span>
                {item.valueNumber}
                {item.configuration.unit &&
                                <span className={classes.unit}>{item.configuration.unit}</span>}
              </span>
            )
          } else {
            console.log(item)
            return null
          }
        case ConfigTypes.DATE:
          if (item.dateFrom && item.dateTo) {
            return (
              <span>
                <span className={classes.rangeSpan}>{`${t('from')} `}</span>
                {format(new Date(item.dateFrom), 'd MMMM y', { locale: uk })}
                <span className={classes.rangeSpan}>{` ${t('to')} `}</span>
                {format(new Date(item.dateTo), 'd MMMM y', { locale: uk })}
              </span>)
          } else if (item.dateFrom) {
            return (
              <span>
                <span className={classes.rangeSpan}>{`${t('from')} `}</span>
                {format(new Date(item.dateFrom), 'd MMMM y', { locale: uk })}
              </span>)
          } else if (item.dateTo) {
            return (
              <span>
                <span className={classes.rangeSpan}>{`${t('to')} `}</span>
                {format(new Date(item.dateTo), 'd MMMM y', { locale: uk })}
              </span>)
          } else {
            return t(item.valueText)
          }
        default:
          break
      }
    }
  }

  if (children || (items && items.length > 0)) {
    return (
      <>
        <FormSectionLabel icon={icon} color={color} iconColor={color} fontSize={theme.typography.body1.fontSize}
          fontWeight={theme.typography.fontWeightBold}
          text={title}/>
        <Box display={'flex'} flexWrap={'wrap'} py={2.5}>
          {children || (items.map(item => (
            <ConfigValue
              key={item.id}
              icon={item.icon ? item.icon : item.configuration && item.configuration.icon ? item.configuration.icon : item.configuration.category ? item.configuration.category.icon : ''}>
              {getConfigValue(item)}{textDivider || ''}
            </ConfigValue>)))
          }
        </Box>
      </>
    )
  } else return null
}

export default ConfigurationSection
