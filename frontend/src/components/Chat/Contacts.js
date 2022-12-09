import React, { useEffect } from 'react'
import ContactItem from './ContactItem'
import Box from '@material-ui/core/Box'
import Search from '../common/inputs/Search/Search'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRooms } from '../../store/chat/thunks'
import { selectRooms } from '../../store/chat/selectors'
import { sliceStatus } from '../../store/sliceStatus'
import Loading from '../Loading'
import Typography from '@material-ui/core/Typography'
import { useTranslation } from 'react-i18next'
import { Scrollbars } from 'react-custom-scrollbars'

const Contacts = () => {
  const dispatch = useDispatch()
  const { status, items } = useSelector(selectRooms)
  const { t } = useTranslation()
  useEffect(() => {
    dispatch(fetchRooms())
  }, [dispatch])

  const mappedContacts = () => {
    if (items) {
      if (items.length === 0 && sliceStatus === sliceStatus.SUCCEEDED) {
        return <Typography>{t('chat.noContacts')}</Typography>
      } else if (items.length > 0) {
        return items.map(room => (
          <ContactItem room={room}/>
        ))
      }
    }
  }
  return (
    <Scrollbars
      style={{ height: 500, width: '100%' }}
      autoHide={true}
      renderTrackHorizontal={props => <div {...props} className="track-horizontal" style={{ display: 'none' }}/>}
    >
      <Box width={1}>
        <Search maxWidth={'100%'}/>
      </Box>
      <Box pb={2}>
        {status === sliceStatus.LOADING && <Loading/>}
        {mappedContacts()}
      </Box>
    </Scrollbars>
  )
}

export default Contacts