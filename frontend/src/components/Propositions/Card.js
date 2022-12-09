import React, { useEffect, useState } from 'react'
import Box from '@material-ui/core/Box'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import Icon from '../Icon'
import FormSectionLabel from '../common/labels/FormSectionLabel'
import { useTranslation } from 'react-i18next'
import { useImmer } from 'use-immer'
import ButtonBase from '@material-ui/core/ButtonBase'
import { format, formatRelative, isValid, parseISO } from 'date-fns'
import { uk } from 'date-fns/locale'
import { configNames, configTypes, ViewType } from '../../constants'
import Divider from '@material-ui/core/Divider'

const useStyles = makeStyles(theme => ({
  card: props => ({
    display: props.isViewTile === ViewType.TILE ? 'block' : 'flex',
    width: '100%',
    height: props.isViewTile === ViewType.TILE ? 403 : 226,
    borderRadius: 10,
    boxShadow: '0px 0px 15px rgba(45, 172, 253, .25)',
    '&:hover': {
      boxShadow: '0px 0px 15px rgba(45, 172, 253, .45)'
    },
    overflow: 'hidden'
  }),
  background: props => ({
    position: 'relative',
    borderRadius: props.isViewTile === ViewType.TILE ? 0 : 8,
    margin: props.isViewTile === ViewType.ROW ? `${theme.spacing(1.5)}px 0px ${theme.spacing(1.5)}px ${theme.spacing(1.5)}px` : 0,
    height: props.isViewTile === ViewType.TILE ? 180 : 202,
    width: props.isViewTile === ViewType.TILE ? 'inherit' : 285,
    background: 'url(/cardBg.png) no-repeat',
    backgroundSize: '100% 100%'
  }),
  divider: {
    backgroundColor: '#CDCDCD'
  },
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

const Card = ({ background, avatar, submission, isViewTile }) => {
  const { type, propertyCategory, location, user, values, price, createdAt, replies, views, saved } = submission
  const classes = useStyles({ background, isViewTile })
  const theme = useTheme()
  const { t } = useTranslation()
  const [submissionLocation, setSubmissionLocation] = useState('')
  const [submissionType, setSubmissionType] = useState('')
  const [date, setDate] = useState('')

  const [configurations, setConfigurations] = useImmer([])

  const getConfigValue = (item) => {
    if (item && item.configuration && item.configuration && item.configuration.type) {
      switch (item.configuration.type.name) {
        case 'priority':
        case 'prioritySlider':
        case 'select':
        case 'time':
        case 'distance':
        case 'check':
          return <FormSectionLabel text={t(item.valueText)} icon={item.configuration.icon} fontSize={'1rem'}
            color={theme.palette.text.secondary}/>
        case 'range':
          if (item.numberFrom && item.numberTo) {
            return (
              <FormSectionLabel text={t(item.valueText)} icon={item.configuration.icon} fontSize={'1rem'}
                color={theme.palette.text.secondary}>
                <span>
                  <span className={classes.rangeSpan}>{`${t('from')} `}</span>
                  {item.numberFrom}{item.configuration.unit &&
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
          } else return t(item)
        case 'date':
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
    if (createdAt && isValid(parseISO(createdAt))) {
      setDate(formatRelative(new Date(createdAt), new Date(), { locale: uk }))
    }
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
        draft.push(groupConfig)
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
  }, [createdAt, location, propertyCategory, setConfigurations, submission, t, type, values])

  return (
    <Box className={classes.card}>
      <Box className={classes.background} display={'flex'} flexWrap={'wrap'}>
        <Avatar className={classes.avatar} src={avatar}/>
        <Box display={'flex'} alignSelf={'flex-end'} justifyContent={'space-between'} flexGrow={ isViewTile === ViewType.TILE ? 1 : 0}>
          { isViewTile === ViewType.TILE && <Typography className={classes.date}
            component={'span'}>{date}</Typography>}
          {user && user.isVip ? <span className={classes.vip}>
            <Icon type={'vip'}/>
          </span> : null}
        </Box>
      </Box>
      <Box px={2.5} width={1}>
        <Box display='flex' justifyContent='space-between' pt={isViewTile === ViewType.TILE ? 1.8 : 1.5} pb={1}>
          <FormSectionLabel
            text={submissionType}
            fontWeight={theme.typography.fontWeightBold}/>
          {isViewTile === ViewType.ROW && <Box display='flex' justifyContent='space-between' width={50}>
            <ButtonBase disableRipple className={classes.cardAction}><Icon type='like'/></ButtonBase>
            <ButtonBase disableRipple className={classes.cardAction}><Icon type='favorite'/></ButtonBase>
          </Box>}
        </Box>
        <Box>
          {
            submissionLocation.length > 0 &&
            <FormSectionLabel icon='locationFilled' iconSize={18} overflow color={theme.palette.text.secondary} fontSize={theme.typography.subtitle1.fontSize}>
              <Box height={27} component={'div'} overflow='hidden' textOverflow='ellipsis'>{submissionLocation}</Box>
            </FormSectionLabel>
          }

          {
            configurations.map((item, i) => (
              <Box py={0.5} key={item.id || i} display={'flex'} flexWrap={'wrap'}>
                {getConfigValue(item)}
              </Box>))
          }

          <Box py={0.5} mt={isViewTile === ViewType.TILE ? 0 : 1} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
            {isViewTile === ViewType.ROW && <Box display={'flex'} justifyContent={'space-between'} flexBasis='80%'>
              {isValid(parseISO(createdAt)) &&
              <Typography variant={'subtitle1'} component={'span'} color={'textSecondary'}>
                {`${t('published')}: `}
                <span
                  className={classes.capitalize}> {formatRelative(new Date(createdAt), new Date(), { locale: uk })} </span>
              </Typography>}

              {typeof views !== 'undefined' &&
              <>
                <Divider flexItem={true} orientation={'vertical'} className={classes.divider}/>
                <Typography variant={'subtitle1'} component={'span'} color={'textSecondary'}>
                  {`${t('views')}: `} {views}</Typography>
              </>}
              {typeof saved !== 'undefined' &&
              <>
                <Divider flexItem={true} orientation={'vertical'} className={classes.divider}/>
                <FormSectionLabel fontSize={theme.typography.subtitle1.fontSize} text={saved} iconSize={18} icon={'favorite'} color={theme.palette.text.secondary}/>
              </>
              }
              {typeof replies !== 'undefined' &&
              <>
                <Divider flexItem={true} orientation={'vertical'} className={classes.divider}/>
                <FormSectionLabel fontSize={theme.typography.subtitle1.fontSize} iconSize={20} text={replies} icon={'comment'} color={theme.palette.text.secondary}/>
              </>
              }
            </Box>}
            {!isNaN(price) && <FormSectionLabel textTransform='none' text={`${price} ${t('currency.uah')}`} icon={'money'} fontSize={theme.typography.body1.fontSize}
              fontWeight={theme.typography.fontWeightBold}
              color={theme.palette.primary.main}/>
            }
            {isViewTile === ViewType.TILE && <ButtonBase className={classes.like}>
              <Icon type={'like'}/>
            </ButtonBase> }
          </Box>
        </Box>
      </Box>
    </Box>)
}

export default Card