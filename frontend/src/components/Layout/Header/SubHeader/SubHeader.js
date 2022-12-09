import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import { useTranslation } from 'react-i18next'
import Search from '../../../common/inputs/Search/Search'
import HeaderLinks from '../HeaderLinks'
import PrimaryButton from '../../../common/buttons/PrimaryButton'
import { useTheme } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  container: {
    borderTop: `1px solid ${theme.palette.text.light}`
  },
  searchBox: {
    marginRight: theme.spacing(5.25)
  }
}))
const SubHeader = ({ setType, links, type }) => {
  const classes = useStyles()
  const theme = useTheme()
  const { t } = useTranslation()

  if (links && links.length > 0) {
    return (
      <Box display='flex' alignItems='center' justifyContent={'space-between'} height={100}
        className={classes.container}>
        {links.map(item => (
          <HeaderLinks text={t(item.name)} key={item.id} isActive={type === item.id}
            clickHandler={() => setType(item.id)}/>
        ))}
        <Box display='flex' justifyContent='flex-end' flexGrow={1}>
          <Box className={classes.searchBox}>
            <Search
              className={classes.searchBox}
              maxWidth={354}
              placeholder={t('chooseDistrict')}
              fontSize={theme.typography.body2.fontSize}/>
          </Box>
          <PrimaryButton
            width={217}
            height={50}
            text={t('createAdHeader')}
            background={theme.palette.primary.main}
            color='white'
            fontSize={theme.typography.body2.fontSize}/>
        </Box>
      </Box>
    )
  } else {
    return null
  }
}

export default SubHeader
