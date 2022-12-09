import React, { useEffect, useState } from 'react'
import Box from '@material-ui/core/Box'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { useTranslation } from 'react-i18next'
import { useImmer } from 'use-immer'
import ButtonBase from '@material-ui/core/ButtonBase'
import { format } from 'date-fns'
import { uk } from 'date-fns/locale'
import { configNames, configTypes, ConfigTypes, ViewType } from '../../constants'
import FormSectionLabel from '../common/labels/FormSectionLabel'
import Icon from '../Icon/Icon'

const useStyles = makeStyles(theme => ({
  avatar: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: 130,
    height: 130,
    margin: 'auto',
    '& .MuiAvatar-img': {
      width: 'initial',
      height: 'initial'
    }
  },
  date: {
    alignSelf: 'flex-end',
    marginBottom: 7,
    marginLeft: 21,
    color: 'white',
    fontSize: '.875rem',
    '&::first-letter': {
      textTransform: 'uppercase'
    }
  },
  vip: {
    display: 'block',
    alignSelf: 'flex-end',
    width: 60,
    justifySelf: 'flex-end'
  },
  like: {
    width: 20
  },
  rangeSpan: {
    color: '#BDBDBD',
    textTransform: 'lowercase'
  },
  unit: {
    fontSize: '.8rem'
  },
  plus: {
    padding: `0px ${theme.spacing(1)}px`,
    color: theme.palette.text.lightGray
  },
  cardAction: {
    display: 'block',
    width: 18
  }
}))

const AdCard = ({ isLiked, handleSendFavorite = () => {}, submission = {}, viewType }) => {
  const { type, propertyCategory, location, values } = submission
  const classes = useStyles()
  const theme = useTheme()
  const { t } = useTranslation()
  const [submissionLocation, setSubmissionLocation] = useState('')
  const [submissionType, setSubmissionType] = useState('')
  const [configurations, setConfigurations] = useImmer([])

  const getConfigValue = (item) => {
    if (item && item.configuration && item.configuration && item.configuration.type) {
      switch (item.configuration.type.name) {
        case ConfigTypes.PRIORITY:
        case ConfigTypes.PRIORITY_SLIDER:
        case ConfigTypes.SELECT:
        case ConfigTypes.TIME:
        case ConfigTypes.DISTANCE:
        case ConfigTypes.CHECK:
          return <FormSectionLabel text={t(item.configurationValue && item.configurationValue.valueText)} icon={item.configuration.icon} fontSize={'1rem'}
            color={theme.palette.text.secondary}/>
        case ConfigTypes.RANGE:
          if (item.numberFrom && item.numberTo) {
            return (
              <FormSectionLabel icon={item.configuration.icon} fontSize={'1rem'}
                color={theme.palette.text.secondary}>
                <span>
                  <span className={classes.rangeSpan}>{`${t('from')} `}</span>
                  {item.numberFrom}
                  {item.configuration.unit &&
                <span className={classes.unit}>{item.configuration.unit}</span>}
                  <span className={classes.rangeSpan}>{` ${t('to')} `}</span>
                  {item.numberTo}{item.configuration.unit &&
                <span className={classes.unit}>{item.configuration.unit}</span>}
                </span>
              </FormSectionLabel>)
          } else if (item.numberFrom) {
            return (
              <FormSectionLabel icon={item.configuration.icon} fontSize={'1rem'}
                color={theme.palette.text.secondary}>
                <span>
                  <span className={classes.rangeSpan}>{`${t('from')} `}</span>
                  {item.numberFrom}{item.configuration.unit &&
                <span className={classes.unit}>{item.configuration.unit}</span>}
                </span>
              </FormSectionLabel>)
          } else if (item.numberTo) {
            return (
              <FormSectionLabel icon={item.configuration.icon} fontSize={'1rem'}
                color={theme.palette.text.secondary}>
                <span>
                  <span className={classes.rangeSpan}>{`${t('to')} `}</span>
                  {item.numberTo}
                  {item.configuration.unit &&
                  <span className={classes.unit}>{item.configuration.unit}</span>}
                </span>
              </FormSectionLabel>)
          } else if (item.valueNumber) {
            return (
              <FormSectionLabel icon={item.configuration.icon} fontSize={'1rem'}
                color={theme.palette.text.secondary}>
                <span>
                  {item.valueNumber}
                  {item.configuration.unit &&
                  <span className={classes.unit}>{item.configuration.unit}</span>}
                </span>
              </FormSectionLabel>)
          } else {
            return null
          }
        case ConfigTypes.DATE:
          if (item.dateFrom && item.dateTo) {
            return (
              <FormSectionLabel icon={item.configuration.icon} fontSize={'1rem'}
                color={theme.palette.text.secondary}>
                <span>
                  <span className={classes.rangeSpan}>{`${t('from')} `}</span>
                  {format(new Date(item.dateFrom), 'd MMMM y', { locale: uk })}
                  <span className={classes.rangeSpan}>{` ${t('to')} `}</span>
                  {format(new Date(item.dateTo), 'd MMMM y', { locale: uk })}
                </span>
              </FormSectionLabel>)
          } else if (item.dateFrom) {
            return (
              <FormSectionLabel icon={item.configuration.icon} fontSize={'1rem'}
                color={theme.palette.text.secondary}>
                <span>
                  <span className={classes.rangeSpan}>{`${t('from')} `}</span>
                  {format(new Date(item.dateFrom), 'd MMMM y', { locale: uk })}
                </span>
              </FormSectionLabel>)
          } else if (item.dateTo) {
            return (
              <FormSectionLabel icon={item.icon} fontSize={'1rem'}
                color={theme.palette.text.secondary}>
                <span>
                  <span className={classes.rangeSpan}>{`${t('to')} `}</span>
                  {format(new Date(item.dateTo), 'd MMMM y', { locale: uk })}
                </span>
              </FormSectionLabel>)
          } else {
            return t(item.valueText)
          }
        default:
          break
      }
    } else if (item && item.type) {
      if (item.type === configTypes.GROUP) {
        if (item.first && item.second) {
          return (
            <Box display={'flex'} flexWrap={'wrap'}>
              {item.first && item.first.valueText && <FormSectionLabel text={t(item.first.valueText)}
                icon={item.first.icon}
                fontSize={'1rem'}
                color={theme.palette.text.secondary}/>}
              <Typography color={'textSecondary'} component={'span'}
                variant={'subtitle1'} className={classes.plus}>&nbsp;+&nbsp;</Typography>
              {item.second && item.second.valueText &&
              <FormSectionLabel text={t(item.second.valueText)} icon={item.second.icon}
                fontSize={'1rem'}
                color={theme.palette.text.secondary}/>}
            </Box>
          )
        }
      }
    }
  }

  useEffect(() => {
    if (type && type.length > 0) {
      let subType = t(type.toLowerCase())
      if (propertyCategory && propertyCategory.name) {
        subType += ` ${t(`propertyCategory.${propertyCategory.name}_subject`)}`
        setSubmissionType(subType)
      }
    } else {
      if (propertyCategory && propertyCategory.name) {
        setSubmissionType(t(`propertyCategory.${propertyCategory.name}`))
      }
    }
    if (location && location.districts && location.districts.length > 0 && location.districts[0]) {
      let locationText = ''
      location.districts.forEach(loc => {
        locationText += locationText.length > 0 ? `, ${t(`districts.${loc.name}`)}` : t(`districts.${loc.name}`)
      })
      setSubmissionLocation(locationText)
    }
    if (values && values.length > 0) {
      const tenants = values.find(item => item.configuration.name === configNames.TENANTS)
      const pets = values.find(item => item.configuration.name === configNames.PETS)
      const groupConfig = {
        type: configTypes.GROUP
      }
      if (tenants && tenants.valueText) {
        groupConfig.first = tenants
      }
      if (pets && pets.valueText) {
        groupConfig.second = pets
      }
      setConfigurations(draft => {
        if (draft.findIndex(item => item.type === configTypes.GROUP) === -1) {
          draft.push(groupConfig)
        }
      })
      values.forEach((value) => {
        setConfigurations(draft => {
          if (value.configuration.name !== configNames.TENANTS && value.configuration.name !== configNames.PETS) {
            if (draft.findIndex(item => item.configuration && item.configuration.name === value.configuration.name) === -1) {
              draft.push(value)
            }
          }
        })
      })
    }
  }, [location, propertyCategory, setConfigurations, submission, t, type, values])

  const handleLike = async (id) => {
    await handleSendFavorite(id)
  }

  return (
    <Box height={173}>
      <Box display='flex' justifyContent='space-between' pt={viewType === ViewType.TILE ? 1.8 : 1.5} pb={1}>
        <FormSectionLabel
          text={submissionType}
          fontWeight={theme.typography.fontWeightBold}/>
        {viewType === ViewType.ROW && <Box display='flex' justifyContent='space-between'>
          <ButtonBase disableRipple className={classes.cardAction} onClick={() => handleLike(submission && submission.id)}>
            {isLiked ? <Icon type={'favoriteFilled'} size={21}/> : <Icon type={'favorite'} size={19}/>}
          </ButtonBase>
        </Box>}
      </Box>
      {
        submissionLocation.length > 0 &&
          <FormSectionLabel icon='locationFilled' iconSize={18} overflow color={theme.palette.text.secondary}
            fontSize={theme.typography.subtitle1.fontSize}>
            <Box height={27} component={'div'} overflow='hidden' textOverflow='ellipsis'>{submissionLocation}</Box>
          </FormSectionLabel>
      }

      {
        configurations.map((item, i) => (
          <Box py={0.5} key={item.id || i} display={'flex'} flexWrap={'wrap'}>
            {getConfigValue(item)}
          </Box>))
      }
    </Box>
  )
}

export default AdCard
