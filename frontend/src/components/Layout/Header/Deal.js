import React from 'react'
import Box from '@material-ui/core/Box'
import { useTranslation } from 'react-i18next'
import Location from './Location'
import { DealTypes } from '../../../constants'
import HeaderLinks from './HeaderLinks'

const Deal = ({ deal, setDeal }) => {
  const { t } = useTranslation()
  return (
    <Box display={'flex'} justifyContent={'space-evenly'} alignItems={'center'}>
      <HeaderLinks text={t('rent')}
        isActive={deal === DealTypes.RENT}
        clickHandler={() => deal === DealTypes.RENT ? setDeal(null) : setDeal(DealTypes.RENT)}/>
      <HeaderLinks text={t('buy')}
        isActive={deal === DealTypes.BUY}
        clickHandler={() => deal === DealTypes.BUY ? setDeal(null) : setDeal(DealTypes.BUY)}/>
      <Box>
        <Location/>
      </Box>
    </Box>
  )
}

export default Deal
