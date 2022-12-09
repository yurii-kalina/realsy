import React, { useEffect } from 'react'
import Box from '@material-ui/core/Box'
import { useTranslation } from 'react-i18next'
import ProfileNavigation from '../Profile/ProfileNavigation'
import { useHistory, useParams } from 'react-router-dom'
import ReceivedProposition from './ReceivedPropositions'
import SentPropositions from './SentPropositions'

const Propositions = () => {
  const { t } = useTranslation()
  const { dest } = useParams()
  const history = useHistory()
  const links = [
    {
      value: t('propositions.received'),
      link: '/profile/propositions/received'
    },
    {
      value: t('propositions.sent'),
      link: '/profile/propositions/sent'
    }
  ]

  useEffect(() => {
    if (!dest || dest.length === 0) {
      history.push('/profile/propositions/received')
    }
  }, [dest, history])
  return (
    <Box pt={6.25} pb={3.75}>
      <ProfileNavigation items={links} selected={dest === 'received' ? links[0].link : dest === 'sent' ? links[1].link : false}/>
      <Box display={dest === 'sent' ? 'block' : 'none'}>
        <SentPropositions/>
      </Box>
      <Box display={dest === 'received' ? 'block' : 'none'}>
        <ReceivedProposition/>
      </Box>
    </Box>
  )
}

export default Propositions