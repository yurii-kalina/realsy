import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useTheme } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import FormSectionLabel from '../common/labels/FormSectionLabel'
import Tab from '../common/tab/Tab'
import Divider from '@material-ui/core/Divider'
import ConfigurationSection from '../Submission/View/Item/ConfigurationSection'
import User from '../Submission/View/Item/User'
import { formatRelative, isValid, parseISO } from 'date-fns'
import { uk } from 'date-fns/locale'
import { useImmer } from 'use-immer'
import SimpleFormButton from '../common/buttons/SimpleFormButton'

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
    padding: '0 50px',
    borderBottom: '1px solid #CDCDCD'
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
  container: {
    padding: '0 50px'
  },
  capitalize: {
    display: 'inline-block',
    '&::first-letter': {
      textTransform: 'uppercase'
    }
  }
}))

const AdView = ({ children, ad = {} }) => {
  const classes = useStyles()
  const { t } = useTranslation()
  const theme = useTheme()
  const { id, price, description, createdAt, views, saved, replies, type, propertyCategory, values, user, location } = ad
  const [topConfig, setTopConfigs] = useImmer([])
  const [timeConfig, setTimeConfig] = useState([])
  const [basicConfig, setBasicConfig] = useImmer([])
  const [extraConfig, setExtraConfig] = useState([])
  const [infrastructure, setInfrastructure] = useState([])

  useEffect(() => {
    if (values && values.length > 0) {
      setTopConfigs(draft => {
        const filtered = values.filter(item => item.configuration.isSpecial && !item.isOptional)
        if (filtered && Array.isArray(filtered)) {
          filtered.forEach(val => {
            if (draft.findIndex(item => item.configuration.id === val.configuration.id) === -1) {
              draft.push(val)
            }
          })
        }
      })
      setTimeConfig(values.filter(item => item.configuration.category.name === 'period'))
      setBasicConfig(draft => {
        const filtered = values.filter(item =>
          !item.isOptional && item.configuration.type.name !== 'date' &&
                    item.configuration.category.name !== 'price' && !item.configuration.category.isDetailed && item.configuration.category.name !== 'period')
        if (filtered && Array.isArray(filtered)) {
          filtered.forEach(val => {
            if (draft.findIndex(item => item.configuration.id === val.configuration.id) === -1) {
              draft.push(val)
            }
          })
        }
      })
      setExtraConfig(values.filter(item => item.configuration.category.isDetailed && item.configuration.category.name !== 'infrastructure'))
      setInfrastructure(values.filter(item => item.configuration.category.name === 'infrastructure'))
    }
  }, [setInfrastructure, setBasicConfig, setExtraConfig, setTimeConfig, setTopConfigs, values])

  const adTitle = () => {
    let title = ''
    title += type && type.length > 0 ? t(type.toLowerCase()) : ''
    title += propertyCategory ? ` ${t(`propertyCategory.${propertyCategory.name}_subject`)}` : ''
    return title
  }

  const getLocations = () => {
    if (location && location.districts && location.districts.length > 0) {
      return (
        location.districts.map(item => (
          <Grid item sm={4} key={item.id}>
            <SimpleFormButton text={t(`districts.${item.name}`)} size={'smaller'}/>
          </Grid>))
      )
    }
  }
  return (
    <Grid>
      <Grid container spacing={2} className={classes.bordered}>
        <Grid item sm={7}>
          <ConfigurationSection title={adTitle()} items={topConfig}/>
          <ConfigurationSection title={t('personality')}>
            {user && user.isSmoker !== null && user.isWorking !== null &&
                        <>
                          <Box>
                            <FormSectionLabel
                              text={user.isWorking && user.occupation ? `${t('employed')} - ${user.occupation}` : t('unemployed')}
                              icon={'occupation'}/>
                          </Box>
                          <Box ml={10}>
                            <FormSectionLabel text={user.isSmoker ? t('iSmoke') : t('iDontSmoke')}
                              icon={'smoke'}/>
                          </Box>
                        </>
            }
          </ConfigurationSection>
          <ConfigurationSection title={t('location')}>
            <Grid container spacing={3}>
              {getLocations()}
            </Grid>
          </ConfigurationSection>
        </Grid>
        <Grid item sm={5}>
          <User user={user} adId={id}/>
        </Grid>
        {timeConfig.length > 0 && <Grid item sm={12}>
          <ConfigurationSection title={t('readiness')} items={timeConfig}/>
        </Grid>}
        <Box display={'flex'} width={1} flexDirection={'row-reverse'}>
          <Box>
            <Tab title={t('price')} value={price ? ` ${price} UAH` : ''} roundedSide={'topRounded'}/>
          </Box>
          {/*          <Box mr={6.25}>
            <Tab roundedSide={'topRounded'} fontSize={theme.typography.body1.fontSize} spaced textColor={'#000000'}
              title={'Стан нерухомості'}
              valueWeight={theme.typography.fontWeightMedium} value={'Комфортний'}
              titleWeight={theme.typography.fontWeightRegular}
              bgColor={'rgba(26, 211, 101, 0.1)'}
              icon={'happy'}>
            </Tab>
          </Box> */}

        </Box>
      </Grid>
      <Grid item sm={12} className={classes.bordered}>
        <Box py={6.25}>
          <ConfigurationSection title={t('basicRequest')} icon={'home'} items={basicConfig} itemDivider={';'}
            color={theme.palette.primary.main} iconColor={theme.palette.primary.main}/>
        </Box>
      </Grid>
      <Grid item sm={12} className={classes.bordered}>
        <Box py={6.25}>
          <ConfigurationSection title={t('extra')} icon={'home'} items={extraConfig} itemDivider={';'}
            color={theme.palette.primary.main} iconColor={theme.palette.primary.main}/>
          <Box mt={4}>
            <ConfigurationSection title={t('infrastructure')} icon={'infrastructure'} items={infrastructure}
              itemDivider={';'}
              color={theme.palette.primary.main}
              iconColor={theme.palette.primary.main}/>
          </Box>
        </Box>
      </Grid>
      <Grid item sm={12} className={classes.bordered}>
        <Box py={6.25}>
          <FormSectionLabel icon={'feather'} color={theme.palette.primary.main}
            fontSize={theme.typography.body1.fontSize} text={t('description')}/>
          <Box mt={2.5}>
            <Typography className={classes.description} component={'p'} variant={'body2'}>
              {description}
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Box display={'flex'} justifyContent={'space-between'} flexGrow={1} py={3.75} px={6.25}>
        {isValid(parseISO(createdAt)) &&
                <Typography variant={'body2'} component={'span'} color={'textSecondary'}>
                  {`${t('published')}: `}
                  <span
                    className={classes.capitalize}> {formatRelative(new Date(createdAt), new Date(), { locale: uk })} </span>
                </Typography>}

        {typeof views !== 'undefined' &&
                <>
                  <Divider flexItem={true} orientation={'vertical'} className={classes.divider}/>
                  <Typography variant={'body2'} component={'span'} color={'textSecondary'}>
                    {`${t('views')}: `} {views}</Typography>
                </>}
        {typeof saved !== 'undefined' &&
                <>
                  <Divider flexItem={true} orientation={'vertical'} className={classes.divider}/>
                  <FormSectionLabel text={saved} icon={'favorite'} color={theme.palette.text.secondary}/>
                </>
        }
        {typeof replies !== 'undefined' &&
                <>
                  <Divider flexItem={true} orientation={'vertical'} className={classes.divider}/>
                  <FormSectionLabel text={replies} icon={'comment'} color={theme.palette.text.secondary}/>
                </>
        }
        {id &&
                <>
                  <Divider flexItem={true} orientation={'vertical'} className={classes.divider}/>
                  <Typography variant={'body2'} component={'span'} color={'textSecondary'}>
                    {`${t('adNumber')}: ${id}`}</Typography>
                </>
        }
      </Box>
      {children}
    </Grid>
  )
}

export default AdView
