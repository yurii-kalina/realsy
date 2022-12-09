import React, { useState } from 'react'
import Box from '@material-ui/core/Box'
import Checkbox from '../../../../common/buttons/Checkbox'
import { useTranslation } from 'react-i18next'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'
import DistanceSlider from '../../../../Slider/distance/DistanceSlider'
import { setSubmissionMetroDistance } from '../../../../../store/submission/slice'

const useStyles = makeStyles(theme => ({
  checkbox: {
    paddingLeft: 29
  },
  metroItems: {
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`
  }
}))
const MetroValues = ({ selected = [], items, selectAllText, handleSelect }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const classes = useStyles()

  const [distance, setDistance] = useState(25)

  const handleSlider = (event, value) => {
    setDistance(value)
    dispatch(setSubmissionMetroDistance(value))
  }

  const metroItems = () => {
    return items && Object.keys(items).map((key, i) => items[key] &&
            <Grid item sm={4} key={i}>
              <Grid container>
                <Grid item sm={12} className={classes.metroItems}>
                  <Box className={classes.checkbox}>
                    <Checkbox size={'small'}
                      checkboxColor={key}
                      text={`${t(`metros.${key}`)} ${t('metros.lane')}`}
                      onClick={() => handleSelect({ distance, value: items[key] })}
                      isActive={selected.filter(item => item.metroLine === key).length === items[key].length}/>
                  </Box>
                </Grid>
                {items[key].map(item =>
                  <Grid item sm={12} key={item.id} className={classes.metroItems}>
                    <Box className={classes.checkbox}>
                      <Checkbox
                        checkboxColor={key}
                        onClick={() => handleSelect({ distance, value: item })}
                        isActive={selected.findIndex(sel => sel.id === item.id) > -1}
                        text={t(`metros.${item.name}`)}/>
                    </Box>
                  </Grid>
                )}
              </Grid>

            </Grid>)
  }

  return (
    <Box mt={2}>
      <Box py={2}>
        <DistanceSlider onChangeCommitted={handleSlider} defaultValue={distance}/>
      </Box>
      <Grid container spacing={0}>
        {metroItems()}
      </Grid>
    </Box>
  )
}

export default MetroValues
