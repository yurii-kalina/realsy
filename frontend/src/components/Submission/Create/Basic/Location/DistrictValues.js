import React from 'react'
import Box from '@material-ui/core/Box'
import PropTypes from 'prop-types'
import Checkbox from '../../../../common/buttons/Checkbox'
import { useTranslation } from 'react-i18next'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import { useRouteMatch } from 'react-router-dom'
import { Paths } from '../../../../../constants'

const useStyles = makeStyles(theme => ({
  checkbox: {
    paddingLeft: 29
  }
}))
const DistrictValues = ({ selected = [], items = [], selectAllText, handleSelect }) => {
  const { t } = useTranslation()
  const classes = useStyles()
  const match = useRouteMatch('/:path')

  const districtItems = () => {
    return items && items.map(item =>
      <Grid item sm={4} key={item.id} className={classes.checkbox}>
        <Box className={classes.checkbox}>
          <Checkbox
            onClick={() => handleSelect(item)}
            text={t(`districts.${item.name}`)}
            isActive={selected.findIndex(district => district.id === item.id) > -1}/>
        </Box>
      </Grid>
    )
  }

  return (
    <Box mt={4}>
      <Grid container spacing={4}>
        {match && (match.url === Paths.AD || match.url === Paths.SEARCH) && <Grid item sm={4}>
          <Box className={classes.checkbox}>
            <Checkbox size={'small'}
              text={selectAllText}
              onClick={() => handleSelect('all')}
              isActive={selected.length === items.length}/>
          </Box>
        </Grid>}
        {districtItems()}
      </Grid>
    </Box>
  )
}

DistrictValues.propTypes = {
  selectAllText: PropTypes.string.isRequired,
  selected: PropTypes.array.isRequired,
  items: PropTypes.array.isRequired,
  handleSelect: PropTypes.func.isRequired
}

export default DistrictValues
