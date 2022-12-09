import React from 'react'
import PropTypes from 'prop-types'
import ConfigItem from './ConfigItem'
import { useTranslation } from 'react-i18next'
import PriorityValueSelection from './ConfigTypes/PriorityValueSelection'
import SelectValueSelection from './ConfigTypes/SelectValueSelection'
import RangeValueSelection from './ConfigTypes/Range/RangeValueSelection'
import DateValueSelection from './ConfigTypes/Date/DateValueSelection'
import CheckConfiguration from './ConfigTypes/Check/CheckConfiguration'
import TimeConfiguration from './ConfigTypes/Time/TimeConfiguration'
import DistanceValueSelection from './ConfigTypes/DistanceValueSelection'
import PriorityWithSliderSelection from './ConfigTypes/PriorityWithSliderSelection'
import PriceConfiguration from './ConfigTypes/PriceConfiguration'
import Grid from '@material-ui/core/Grid'
import { useRouteMatch } from 'react-router-dom'
import { Paths } from '../../constants'

const ConfigType = ({ configurations = [], category, isOnlyForRent }) => {
  const match = useRouteMatch('/:path')
  const { t } = useTranslation()
  if (configurations) {
    return configurations.map(config => {
      if (config.type) {
        if (config.type.name === 'priority') {
          return (
            <Grid item sm={6} key={config.id}>
              <ConfigItem id={config.id} name={t(config.name)}
                hasPriority={match && (match.url === Paths.AD || match.url === Paths.SEARCH)}
                type={config.type}
                configLength={config.values.length}>
                <PriorityValueSelection configuration={{ ...config, category, isOnlyForRent }}
                  type={config.type}/>
              </ConfigItem>
            </Grid>
          )
        } else if (config.type.name === 'prioritySlider') {
          return (
            <Grid item sm={6} key={config.id}>
              <ConfigItem id={config.id} name={t(config.name)}
                hasPriority={match && (match.url === Paths.AD || match.url === Paths.SEARCH)}
                hasTitle={config.values && config.values.length > 0} type={config.type}
                configLength={config.values.length}>
                <PriorityWithSliderSelection configuration={{ ...config, category, isOnlyForRent }}
                  type={config.type}/>
              </ConfigItem>
            </Grid>
          )
        } else if (config.type.name === 'select') {
          return (
            <Grid item sm={12} key={config.id}>
              <SelectValueSelection key={config.id} configuration={{ ...config, category, isOnlyForRent }}
                type={config.type}/>
            </Grid>
          )
        } else if (config.type.name === 'range') {
          return (
            <Grid item sm={6} key={config.id}>
              <ConfigItem id={config.id} name={t(config.name)} hasPriority={false} hasTitle={false}
                type={config.type}>
                <RangeValueSelection configuration={{ ...config, category, isOnlyForRent }}/>
              </ConfigItem>
            </Grid>)
        } else if (config.type.name === 'distance') {
          return (
            <Grid item sm={6} key={config.id}>
              <ConfigItem id={config.id} name={t(config.name)} hasPriority={false} hasTitle={false}
                type={config.type} configLength={config.values.length}>
                <DistanceValueSelection configuration={{ ...config, category, isOnlyForRent }}/>
              </ConfigItem>
            </Grid>
          )
        } else if (config.type.name === 'date') {
          return (
            <Grid item sm={6} key={config.id}>
              <ConfigItem id={config.id} name={t(config.name)} hasPriority={false} type={config.type}>
                <DateValueSelection configuration={{ ...config, category, isOnlyForRent }}/>
              </ConfigItem>
            </Grid>
          )
        } else if (config.type.name === 'check') {
          if (config.isIconLarge) {
            return <Grid item sm={3} key={config.id}><CheckConfiguration
              configuration={{ ...config, category, isOnlyForRent }}/></Grid>
          } else {
            return <CheckConfiguration key={config.id}
              configuration={{ ...config, category, isOnlyForRent }}/>
          }
        } else if (config.type.name === 'time') {
          return <Grid item sm={12} key={config.id}><TimeConfiguration
            configuration={{ ...config, category, isOnlyForRent }}/></Grid>
        } else if (config.type.name === 'price') {
          return <Grid item sm={12} key={config.id}><PriceConfiguration
            configuration={{ ...config, category, isOnlyForRent }}/></Grid>
        } else return null
      } else return null
    })
  } else return null
}

ConfigType.propTypes = {
  configuration: PropTypes.array
}

export default ConfigType
