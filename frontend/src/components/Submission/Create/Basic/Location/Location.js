import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import FormSectionLabel from '../../../../common/labels/FormSectionLabel'
import Box from '@material-ui/core/Box'
import SelectedLocations from './SelectedLocations'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import ModalContent from './ModalContent'
import { Modal } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  selectedContainer: {
    minWidth: '250px',
    borderBottom: theme.border,
    overflow: 'hidden'
  },
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
  }
}))

const Location = props => {
  const classes = useStyles()
  const { t } = useTranslation()
  const theme = useTheme()
  const [open, setOpen] = useState(false)

  const handleModalOpen = (event) => {
    setOpen(true)
  }

  const handleModalClose = () => {
    setOpen(false)
  }
  return (
    <Box mt={5}>
      <FormSectionLabel text={`${t('location')}:`} icon={'location'}
        fontWeight={theme.typography.fontWeightMedium}
        fontSize={theme.typography.body1.fontSize}/>
      <Box width={1} py={1} mt={1} display={'flex'} id={'modalOpenner'} onClick={handleModalOpen}
        className={classes.selectedContainer}>
        <SelectedLocations/>
      </Box>
      <Modal
        open={open}
        onBackdropClick={handleModalClose}
        className={classes.modalContainer}
        onClose={handleModalClose}
        BackdropProps={{ invisible: true }}
      >
        <Box className={classes.window}>
          <ModalContent handleModalClose={handleModalClose}/>
        </Box>
      </Modal>
    </Box>
  )
}

export default Location
