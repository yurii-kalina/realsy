import Container from '@material-ui/core/Container'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@material-ui/core/Box'
import Logo from '../../Layout/Header/Logo'
import LanguageSelector from '../../Layout/Header/LanguageSelector'
import User from '../../Layout/Header/User'
import Link from '@material-ui/core/Link'
import { Link as RouterLink } from 'react-router-dom'
import PrimaryButton from '../../common/buttons/PrimaryButton'
import { useSelector } from 'react-redux'
import { selectUser } from '../../../store/user/selectors'

export const Header = () => {
  const { t } = useTranslation()
  const { user } = useSelector(selectUser)

  return (
    <Container item sm={10}>
      <Box height={100} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
        <Logo/>
        <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
          <LanguageSelector/>
          {user ? <User/>
            : <Link to='/users/login' component={RouterLink} underline='none'>
              <PrimaryButton text={t('enter')} width={150} height={50} size={'custom'}/>
            </Link>
          }
        </Box>
      </Box>
    </Container>

  )
}