import React, { useEffect, useState } from 'react'
import Typography from '@material-ui/core/Typography'
import { useTranslation } from 'react-i18next'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import PriceSlider from '../../Slider/price/PriceSlider'
import { useDispatch, useSelector } from 'react-redux'
import { setSubmissionConfiguration } from '../../../store/submission/slice'
import clsx from 'clsx'
import Icon from '../../Icon'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import { selectConfigurations } from '../../../store/submission/selectors'

const useStyles = makeStyles(theme => ({
  priceText: {
    maxWidth: 771,
    marginTop: 20,
    '&:first-letter': {
      textTransform: 'uppercase'
    }
  },
  input: {
    width: 100,
    height: 50,
    borderRadius: '8px !important',
    color: theme.palette.text.secondary,
    fontSize: theme.typography.body2.fontSize,
    '& .MuiSelect-select:focus': {
      backgroundColor: 'transparent'
    },
    '& .MuiOutlinedInput-input': {
      padding: '13.5px 14px'
    },
    '& .MuiSelect-iconOutlined': {
      right: '18px !important'
    }
  }
}))
const PriceConfiguration = ({ configuration }) => {
  const { id, name, ...others } = configuration
  const [slider] = useState(50)
  const [price, setPrice] = useState('')
  const classes = useStyles()
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const configurations = useSelector(selectConfigurations)
  const [selected, setSelected] = useState({})

  useEffect(() => {
    setSelected(configurations.find(item => item.id === id))
  }, [configurations, id])

  useEffect(() => {
    if (selected && selected.value && selected.value.valueNumber) {
      setPrice(selected.value.valueNumber)
    }
  }, [selected])

  const onBlur = () => {
    dispatch(setSubmissionConfiguration({ id, name, value: { valueText: name, valueNumber: price }, ...others }))
  }

  const SelectIcon = (props) => (
    <span {...props} style={{ width: 16 }}><Icon isUnClickable={true} type={'arrowDown'}/></span>
  )

  return (
    <Grid container spacing={2}>
      <Grid item sm={12}>
        <Typography variant={'body2'} color={'textSecondary'} className={classes.priceText}>
          {t('readyToPay')}
        </Typography>
      </Grid>
      <Grid item sm={5} className={classes.priceValue}>
        <Box display={'flex'} alignItems={'center'} height={'100%'} marginTop={3.75}>
          <FormControl className={classes.formControl}>
            <Select
              id={`${id}`} name={name}
              className={clsx(classes.input)}
              value={'uah'}
              variant={'outlined'}
              inputProps={{ 'aria-label': 'Without label' }}
              IconComponent={SelectIcon}
            >
              <MenuItem value={'uah'}>UAH</MenuItem>
              <MenuItem value={'usd'}>USD</MenuItem>
            </Select>
          </FormControl>
          <Box ml={2.5}>
            <TextField type={'number'} value={price} onChange={(e) => setPrice(e.target.value)}
              onBlur={onBlur}/>
          </Box>
        </Box>
      </Grid>
      <Grid item sm={7} className={classes.priceValue}>
        <Box mt={3}>
          <PriceSlider iconName={'price'} iconColor={'white'} value={slider} setValue={() => {
          }} onChangeCommitted={() => {
          }}/>

        </Box>
      </Grid>
    </Grid>
  )
}

export default PriceConfiguration
