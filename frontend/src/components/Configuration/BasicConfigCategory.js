import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  getBuyConfigurations,
  getPropertyConfigurations,
  getRentConfigurations
} from '../../store/configuration/selectors'
import Box from '@material-ui/core/Box'
import { sliceStatus } from '../../store/sliceStatus'
import Error from '../Error'
import Loading from '../Loading'
import FormSectionLabel from '../common/labels/FormSectionLabel'
import { useTranslation } from 'react-i18next'
import ConfigType from './ConfigType'
import { useTheme } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import { getSubmissionType } from '../../store/submission/selectors'
import PrimaryButton from '../common/buttons/PrimaryButton'
import { DealTypes } from '../../constants'

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: 40
  }
}))
const BasicConfigCategory = ({ handleStep }) => {
  const classes = useStyles()
  const theme = useTheme()
  const { t } = useTranslation()
  const scrollToRef = useRef(null)
  const type = useSelector(getSubmissionType)
  const { status, error } = useSelector(getPropertyConfigurations)
  const buyConfigs = useSelector(getBuyConfigurations)
  const rentConfiguration = useSelector(getRentConfigurations)
  const [configs, setConfigs] = useState([])

  useEffect(() => {
    if (type !== '') {
      if (type === DealTypes.BUY) {
        setConfigs(buyConfigs)
      } else {
        setConfigs(rentConfiguration)
      }
    }
  }, [buyConfigs, rentConfiguration, type])

  const listItems = () => configs.map(item => (
    <Grid container spacing={3} justify={'space-between'} key={item.id} className={classes.container}>
      {item.icon
        ? <Grid container item sm={12}>
          <FormSectionLabel text={t(item.name)}
            icon={item.icon}
            iconColor={'#333'}
            fontWeight={theme.typography.fontWeightMedium}
            fontSize={theme.typography.body1.fontSize}/>
          {item.configurations.length === 1 && item.configurations[0] && item.configurations[0].type && item.configurations[0].type.name === 'check' && item.configurations[0].isIconLarge === false
            ? <Box ml={4}><ConfigType
              category={{ name: item.name, isDetailed: item.isDetailed, icon: item.icon }}
              configurations={item.configurations}/></Box> : null}
        </Grid>
        : null}
      {item.name !== 'underRedemption'
        ? <ConfigType key={item.id} category={{ name: item.name, isDetailed: item.isDetailed, icon: item.icon }}
          isOnlyForRent={item.isOnlyForRent}
          configurations={item.configurations}/> : null}
    </Grid>
  ))

  return (
    <Box ref={scrollToRef}>
      {status === sliceStatus.FAILED ? <Error error={error}/> : null}
      {status === sliceStatus.LOADING ? <Loading/> : null}
      {status === sliceStatus.SUCCEEDED && <>
        <Box minHeight={500}>{listItems()}</Box>
        <Box width={1} display={'flex'} justifyContent={'center'}>
          <PrimaryButton text={t('next')} onClick={() => handleStep(2)} icon={'rightArrow'}
            iconPosition={'right'}
            iconColor={'white'} iconSize={37} size={'medium'}
            fontSize={theme.typography.h5.fontSize}/>
        </Box>
      </>}
    </Box>
  )
}
export default BasicConfigCategory
