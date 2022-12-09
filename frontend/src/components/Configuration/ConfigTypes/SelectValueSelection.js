import React, { useEffect, useState } from 'react'
import LargeIconButton from '../../common/buttons/LargeIconButton'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { setSubmissionConfiguration } from '../../../store/submission/slice'
import SimpleFormButton from '../../common/buttons/SimpleFormButton'
import Grid from '@material-ui/core/Grid'
import { selectConfigurations } from '../../../store/submission/selectors'

const SelectValueSelection = ({ configuration }) => {
  const { id, name, values, isIconLarge, ...others } = configuration
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const configurations = useSelector(selectConfigurations)
  const [selected, setSelected] = useState({})

  useEffect(() => {
    setSelected(configurations.find(item => item.id === id))
  }, [configurations, id])

  return (
    <Grid container justify={values && values.length > 3 ? 'space-between' : 'flex-start'}>
      {values.map(item => (
        <Grid item sm={3} key={item.id}>
          {isIconLarge
            ? (<LargeIconButton
              name={`${t(item.valueText)}${item.unit ? ` ${item.unit}` : ''}`}
              iconName={item.icon}
              onClick={() => dispatch(setSubmissionConfiguration({
                id,
                name,
                value: item,
                ...others
              }))}
              isActive={selected && selected.value && selected.value.id === item.id}
              iconSize={item.iconWidth}
            />)
            : <SimpleFormButton
              text={t(item.valueText)}
              icon={item.icon}
              iconSize={16}
              variant={'bordered'}
              iconPosition={'left'}
              onClick={() => dispatch(setSubmissionConfiguration({ id, name, value: item, ...others }))}
              isActive={selected && selected.value && selected.value.id === item.id}
              showActive={true}/>}
        </Grid>
      ))
      }
    </Grid>
  )
}

export default SelectValueSelection
