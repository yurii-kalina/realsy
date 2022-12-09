import React, { useState } from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import FormControl from '@material-ui/core/FormControl'
import { Select, useTheme } from '@material-ui/core'
import clsx from 'clsx'
import MenuItem from '@material-ui/core/MenuItem'
import ButtonBase from '@material-ui/core/ButtonBase'
import Icon from '../Icon'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'
import { SortBy, ViewType } from '../../constants'

const useStyles = makeStyles(theme => ({
  sort: {
    color: theme.palette.text.secondary
  },
  input: {
    width: 200,
    height: 50,
    marginLeft: theme.spacing(2.5),
    borderRadius: '8px !important',
    background: '#EEEFF1',
    color: theme.palette.text.darkGray,
    fontSize: theme.typography.body2.fontSize,
    '& .MuiSelect-select:focus': {
      backgroundColor: 'transparent'
    },
    '& .MuiOutlinedInput-input': {
      padding: `${theme.spacing(1.625)}px ${theme.spacing(2.5)}px`
    },
    '& .MuiSelect-iconOutlined': {
      right: '12px !important'
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none !important'
    }
  },
  viewButton: {
    width: 27,
    marginLeft: theme.spacing(2.5)
  }
}))

const SelectIcon = (props) => (
  <span {...props} style={{ width: 16 }}><Icon isUnClickable={true} type={'arrowDown'}/></span>
)

const Sort = ({ viewType, viewHandler, sortHandler, sortValue }) => {
  const classes = useStyles()
  const { t } = useTranslation()
  const theme = useTheme()
  const [selected, setSelected] = useState(SortBy.CREATED_AT)

  const onChange = (e) => {
    const val = e.target.value
    setSelected(val)
    sortHandler(val)
  }
  return (
    <Box display='flex' justifyContent='space-evenly' alignItems='center'>
      <Typography variant='body1' className={classes.sort}>
        {t('sortBy')}:
      </Typography>
      <FormControl className={classes.formControl}>
        <Select
          className={clsx(classes.input)}
          value={selected}
          name={'city'} id={'city'}
          variant={'outlined'}
          onChange={onChange}
          IconComponent={SelectIcon}
        >
          <MenuItem value={SortBy.CREATED_AT}>{t('sort.SortDate')}</MenuItem>
          <MenuItem value={SortBy.PRICE_MAX}>{t('sort.sortPriceUp')}</MenuItem>
          <MenuItem value={SortBy.PRICE_MIN}>{t('sort.sortPriceDown')}</MenuItem>
        </Select>
      </FormControl>
      <Box ml={6.25} display='flex'>
        <ButtonBase disableRipple className={classes.viewButton}>
          <Icon type='tileView' onClick={() => viewHandler(ViewType.TILE)}
            color={viewType === ViewType.TILE ? theme.palette.primary.main : undefined}/>
        </ButtonBase>
        <ButtonBase disableRipple className={classes.viewButton}>
          <Icon type='rowView' onClick={() => viewHandler(ViewType.ROW)}
            color={viewType === ViewType.ROW ? theme.palette.primary.main : undefined}/>
        </ButtonBase>
      </Box>
    </Box>
  )
}

export default Sort