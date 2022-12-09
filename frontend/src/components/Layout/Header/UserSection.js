import React from 'react'
import PrimaryButton from '../../common/buttons/PrimaryButton'
import { useTranslation } from 'react-i18next'
import FavoriteAndNotifications from './FavoriteAndNotifications'
import Box from '@material-ui/core/Box'
import LanguageSelector from './LanguageSelector'
import { selectUser } from '../../../store/user/selectors'
import User from './User'
import { useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link'

const UserSection = props => {
  const { t } = useTranslation()
  const { user } = useSelector(selectUser)
  return (
    <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
      <FavoriteAndNotifications/>
      <LanguageSelector/>
      {user ? <User/>
        : <Link to='/users/login' component={RouterLink} underline='none'><PrimaryButton text={t('enter')}
          width={150} height={50}
          size={'custom'}/></Link>
      }
    </Box>

  )
}

export default UserSection
