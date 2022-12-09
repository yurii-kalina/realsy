import React from 'react'
import PrimaryButton from '../common/buttons/PrimaryButton'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import { useDispatch, useSelector } from 'react-redux'
import { answerProposition } from '../../store/propositions/thunks'
import { PropositionStatus } from '../../constants'
import { makeStyles } from '@material-ui/core/styles'
import Icon from '../Icon/Icon'
import { selectUserInfo } from '../../store/user/selectors'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  checked: {
    display: 'block',
    width: 16,
    marginLeft: theme.spacing(1)
  }
}))

const PropositionActions = ({ proposition = {} }) => {
  const classes = useStyles()
  const { id, status } = proposition
  const dispatch = useDispatch()
  const theme = useTheme()
  const { t } = useTranslation()
  const { property } = proposition
  const { id: userId } = useSelector(selectUserInfo)
  const handleSubmit = (newStatus) => {
    dispatch(answerProposition({
      id,
      status: newStatus
    }))
  }
  return (
    <Box py={6.25} display='flex' flexWrap='wrap' justifyContent='space-between'>
      {property && property.user && property.user.id !== userId &&
      <>
        <PrimaryButton
          onClick={() => handleSubmit(PropositionStatus.REJECTED)}
          fontSize={theme.typography.body2.fontSize}
          fontWeight={theme.typography.fontWeightBold}
          size='small'
          text={t('propositions.notInterested')}
          variant='bordered'
          color='#E93443'>
          {status === PropositionStatus.REJECTED && <span className={classes.checked}><Icon color='#E93443' type={'checked'}/></span>}
        </PrimaryButton>
        <PrimaryButton
          onClick={() => handleSubmit(PropositionStatus.PENDING)}
          fontSize={theme.typography.body2.fontSize}
          fontWeight={theme.typography.fontWeightBold}
          size='small'
          text={t('propositions.bargain')}
          variant='bordered'
          color={theme.palette.primary.main}>
          {status === PropositionStatus.PENDING && <span style={{ width: 16 }}><Icon type={'checked'} color={theme.palette.primary.main}/></span>}
        </PrimaryButton>
        <PrimaryButton
          onClick={() => handleSubmit(PropositionStatus.ACCEPTED)}
          fontSize={theme.typography.body2.fontSize}
          fontWeight={theme.typography.fontWeightBold}
          size='small'
          text={t('propositions.interested')}
          variant='bordered'
          color={theme.palette.secondary.main}>
          {status === PropositionStatus.ACCEPTED && <span className={classes.checked}><Icon color={theme.palette.secondary.main} type={'checked'}/></span>}
        </PrimaryButton>
      </>}
      {property && property.user && property.user.id === userId && <>
        {status === PropositionStatus.NEW && <Typography variant={'body1'} className={classes.clientResponse}>
          {t('propositions.hasNotDecidedYet')}
        </Typography>}
        {status === PropositionStatus.PENDING && <Typography variant={'body1'} className={classes.clientResponse}>
          {t('propositions.wantsToBargain')}
        </Typography>}
        {status === PropositionStatus.REJECTED && <Typography variant={'body1'} className={classes.clientResponse}>
          {t('propositions.notInterseted')}
        </Typography>}
        {status === PropositionStatus.ACCEPTED && <Typography variant={'body1'} className={classes.clientResponse}>
          {t('propositions.isInterested')}
        </Typography>}
      </>}
    </Box>
  )
}

export default PropositionActions