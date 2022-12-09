import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

const OwnerNavigation = props => {
  const { t } = useTranslation()
  const items = [
    {
      value: t('profile.all')
    },
    {
      value: t('profile.new')
    },
    {
      value: t('profile.pending')
    },
    {
      value: t('profile.rejected')
    }
  ]
  const [selected, setSelected] = useState(items[0])
  return (
    <ProfileNavigation selected={selected} setSelected={setSelected} items={items}/>
  )
}

export default OwnerNavigation
