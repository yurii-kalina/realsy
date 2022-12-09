import React from 'react'
import Box from '@material-ui/core/Box'
import ButtonBase from '@material-ui/core/ButtonBase'
import Icon from '../Icon'
import ModalHeader from './ModalHeader'
import Popover from '@material-ui/core/Popover/Popover'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { useRouteMatch } from 'react-router-dom'
import { Paths } from '../../constants'

const useStyles = makeStyles((theme) => ({
  window: {
    display: 'block',
    position: 'relative',
    maxWidth: '700px',
    padding: 18,
    borderRadius: 10,
    background: '#FFFFFF',
    boxShadow: '0px 2px 15px rgba(0, 0, 0, .25)',
    overflow: 'hidden'
  },
  close: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    width: 16,
    color: theme.palette.text.light,
    cursor: 'pointer'
  }
}))

const Modal = ({ buttonId, hasPriority, hasTitle = true, open, anchorEl, handleModalClose, children }) => {
  const classes = useStyles()
  const match = useRouteMatch('/:path')

  const { t } = useTranslation()
  return (
    <Popover
      id={buttonId}
      open={open}
      anchorEl={anchorEl}
      onClose={handleModalClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}
    >
      <Box className={classes.window}>
        <ButtonBase className={classes.close} onClick={handleModalClose}>
          <Icon type={'close'}/>
        </ButtonBase>
        {hasTitle ? <ModalHeader
          title={match && (match.url === Paths.AD || match.url === Paths.SEARCH) ? t('chooseMandatoryOptional') : t('chooseConfig')}
          hasPriority={hasPriority}/> : null}
        {React.cloneElement(children, { handleClose: handleModalClose })}
      </Box>
    </Popover>
  )
}

Modal.propTypes = {
  buttonId: PropTypes.number,
  hasPriority: PropTypes.bool,
  hasTitle: PropTypes.bool,
  open: PropTypes.bool,
  handleModalClose: PropTypes.func,
  anchorEl: PropTypes.object
}

export default Modal
