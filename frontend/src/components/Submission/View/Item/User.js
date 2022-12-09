import React, { useState } from 'react'
import { Box } from '@material-ui/core'
import PrimaryButton from '../../../common/buttons/PrimaryButton'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserInfo } from '../../../../store/user/selectors'
import List from '../../../Property/Offer/List'
import { Redirect, useLocation } from 'react-router-dom'
import UserInfo from '../../../Layout/UserInfo'
import Modal from '@material-ui/core/Modal'
import { makeStyles } from '@material-ui/core/styles'
import Icon from '../../../Icon'
import ButtonBase from '@material-ui/core/ButtonBase'
import { selectFavoritePropertiesIds } from '../../../../store/favorite/selectors'
import { deleteFavorite, sendFavorite } from '../../../../store/favorite/thunks'

const useStyles = makeStyles(theme => ({
  window: {
    display: 'block',
    position: 'relative',
    padding: '30px 30px',
    borderRadius: 10,
    background: '#FFFFFF',
    boxShadow: '0px 2px 15px rgba(0, 0, 0, .25)',
    overflow: 'hidden',
    [theme.breakpoints.down('lg')]: {
      width: 900,
      margin: '0 auto',
      outline: 0
    }
  },
  modalContainer: {
    margin: 'auto',
    marginTop: theme.spacing(2),
    overflowY: 'scroll',
    outline: 0
  },
  close: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    width: 16,
    height: 16,
    color: theme.palette.text.light,
    cursor: 'pointer'
  }
}))

const User = ({ user, adId, children }) => {
  const classes = useStyles()
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const favoriteProperties = useSelector(selectFavoritePropertiesIds)
  const dispatch = useDispatch()

  const loggedIn = useSelector(selectUserInfo)
  const location = useLocation()

  const handleOffer = (event) => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleFavorite = async () => {
    const index = favoriteProperties.findIndex(item => item === adId)
    if (index > -1) {
      await dispatch(deleteFavorite({ propertyId: adId }))
    } else await dispatch(sendFavorite({ propertyId: adId }))
  }

  if (user) {
    return (
      <Box display={'flex'} flexWrap={'wrap'}>
        <UserInfo user={user}/>
        <Box display={'flex'} justifyContent={'space-around'} flexGrow={1} mt={4.25} flexWrap='wrap'>
          {children || ((loggedIn && loggedIn.phone === user.phone)
            ? <>
              <PrimaryButton text={t('boost')} variant={'bordered'}
                size={'small'}/>
              <PrimaryButton text={t('advertise')} size={'small'}/>
            </>
            : <>
              <PrimaryButton text={t('saveAd')} icon={favoriteProperties.findIndex(item => item === adId) > -1 ? 'favoriteFilled' : 'favorite'} iconPosition={'left'} variant={'bordered'}
                size={'small'} iconSize={16} iconColor={'#000'} onClick={handleFavorite}/>
              <PrimaryButton onClick={handleOffer} text={t('offer')} size={'small'}/>
            </>) }

        </Box>
        <Modal
          open={open}
          onBackdropClick={handleClose}
          className={classes.modalContainer}
          onClose={handleClose}
          BackdropProps={{ invisible: true }}
        >
          <div className={classes.window}>
            <ButtonBase className={classes.close} onClick={handleClose}>
              <Icon type={'close'}/>
            </ButtonBase>
            {loggedIn ? <List adId={adId}/> : <Redirect to={{ pathname: '/users/login', state: { from: location } }}/>}

          </div>
        </Modal>
      </Box>
    )
  } else return null
}

export default User
