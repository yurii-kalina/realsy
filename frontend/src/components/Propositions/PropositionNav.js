import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ProfileNavigation from '../Profile/ProfileNavigation'

const PropositionNav = () => {
  const { t } = useTranslation()
  const items = [
    {
      value: t('profile.all'),
      link: '/propositions/received'
    },
    {
      value: t('profile.new')
    }
  ]
  const [selected, setSelected] = useState(items[0])
  return (
    <ProfileNavigation selected={selected} setSelected={setSelected} items={items}/>
  )
}

export default PropositionNav
