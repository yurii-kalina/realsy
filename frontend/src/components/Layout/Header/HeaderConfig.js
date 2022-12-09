import React, { useEffect, useState } from 'react'
import Box from '@material-ui/core/Box'
import Icon from '../../Icon'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'
import Select from '@material-ui/core/Select/Select'
import clsx from 'clsx'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Types from './Configurations/Types'
import Search from '../../common/inputs/Search/Search'
import PrimaryButton from '../../common/buttons/PrimaryButton'
import { useTheme } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  container: {
    borderTop: `1px solid ${theme.palette.text.light}`
  },
  searchBox: {
    marginRight: theme.spacing(5.25)
  },
  buttons: {
    padding: 0,
    color: theme.palette.text.primary,
    fontSize: theme.typography.body2.fontSize,
    fontWeight: theme.typography.fontWeightMedium,
    textTransform: 'capitalize',
    '&:hover': {
      background: 'transparent'
    }
  },
  input: {
    color: theme.palette.text.primary,
    fontSize: theme.typography.body2.fontSize,
    textTransform: 'capitalize',
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none !important'
    },
    '& .MuiSelect-select:focus': {
      background: 'transparent'
    }
  },
  menu: {
    borderRadius: '0px 0px 10px 10px'
  },
  menuItem: {
    color: theme.palette.text.light,
    fontSize: theme.typography.body2.fontSize,
    textTransform: 'capitalize'
  }

}))

const SelectIcon = (props) => (
  <span {...props} style={{ width: 16 }}><Icon isUnClickable={true} type={'arrowDown'}/></span>
)

const HeaderConfig = ({ categories = [] }) => {
  const [category, setCategory] = useState(null)
  const classes = useStyles()
  const { t } = useTranslation()
  const theme = useTheme()
  useEffect(() => {
    setCategory(categories[0])
  }, [categories])
  const handleSelect = (event) => {
    const id = event.target.value
    const newCategory = categories.find(item => item.id === id)
    if (newCategory) {
      setCategory(newCategory)
    }
  }
  if (categories && categories.length > 0 && category) {
    return (
      <Box display='flex' alignItems='center' height={100} className={classes.container}>
        <FormControl className={classes.formControl}>
          <Select
            className={clsx(classes.input)}
            value={category.id}
            variant={'outlined'}
            inputProps={{ 'aria-label': 'Without label' }}
            IconComponent={SelectIcon}
            onChange={handleSelect}
            MenuProps={{
              classes: {
                paper: classes.menu
              },
              anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'center'
              },
              transformOrigin: {
                vertical: 'top',
                horizontal: 'center'
              },
              getContentAnchorEl: null
            }}
          >
            {
              categories.map(item => <MenuItem key={item.id} className={classes.menuItem}
                value={item.id}>{t(`propertyCategory.${item.name}`)}</MenuItem>)
            }
          </Select>
        </FormControl>
        {category.configurations && category.configurations.length > 0 && category.configurations.map(config => (
          <Types key={config.id} configuration={config}/>
        ))}
        <Box display='flex' justifyContent='flex-end' flexGrow={1}>
          <Box className={classes.searchBox}>
            <Search
              maxWidth={354}
              placeholder={t('searchKeyword')}
              fontSize={theme.typography.body2.fontSize}/>
          </Box>
          <PrimaryButton
            width={217}
            height={50}
            text={t('extendedSearch')}
            variant='bordered'
            fontSize={theme.typography.body2.fontSize}/>
        </Box>
      </Box>
    )
  } else return null
}

export default HeaderConfig