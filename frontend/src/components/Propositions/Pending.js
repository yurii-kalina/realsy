import React, { useEffect, useState } from 'react'
import Box from '@material-ui/core/Box'
import FormSectionLabel from '../common/labels/FormSectionLabel'
import TextField from '@material-ui/core/TextField/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import Icon from '../Icon'
import PrimaryButton from '../common/buttons/PrimaryButton'
import { sliceStatus } from '../../store/sliceStatus'
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'
import { answerProposition } from '../../store/propositions/thunks'
import { PropositionStatus } from '../../constants'
import { makeStyles } from '@material-ui/core/styles'
import { useTheme } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { selectPropositionOffer } from '../../store/propositions/selectors'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserInfo } from '../../store/user/selectors'

const useStyles = makeStyles(theme => ({
  input: {
    width: 200,
    paddingRight: theme.spacing(0.5),
    paddingLeft: theme.spacing(0.5)
  },
  text: {
    color: theme.palette.text.secondary,
    fontSize: theme.typography.body2.fontSize
  },
  loading: {
    marginTop: theme.spacing(0.4),
    padding: theme.spacing(1.25)
  }
}))

const Pending = ({ propPrice = 0, id, owner, ownerPrice, clientPrice }) => {
  const { status: loadingStatus } = useSelector(selectPropositionOffer)
  const { id: userId } = useSelector(selectUserInfo)
  const dispatch = useDispatch()
  const classes = useStyles()
  const theme = useTheme()
  const { t } = useTranslation()
  const [price, setPrice] = useState(propPrice)

  useEffect(() => {

  }, [userId, owner])

  const handleSubmit = () => {
    if (id) {
      if (owner) {
        if (owner.id === userId) {
          dispatch(answerProposition({
            id,
            ownerPrice: price,
            status: PropositionStatus.PENDING
          }))
        }
      }
    }
  }

  return (
    <Box width={1}>
      <Box width={1} display='flex' justifyContent='space-between'>
        <FormSectionLabel fontWeight={theme.typography.fontWeightBold} fontSize={theme.typography.body1.fontSize}
          text={t('propositions.offerPrice')}/>
        <TextField className={classes.input} value={price}
          onChange={(e) => setPrice(e.target.value)} InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <span style={{ width: 20 }}>
                  <Icon type={'money'} color={theme.palette.text.lightGray}/>
                </span>
              </InputAdornment>
            )
          }}/>
        <PrimaryButton
          onClick={handleSubmit}
          text={t('offer')}
          size='small'
          background={theme.palette.primary.main}>
          {loadingStatus === sliceStatus.LOADING &&
            <span className={classes.loading}>
              <CircularProgress color={'inherit'} size={20}/>
            </span>
          }
        </PrimaryButton>
      </Box>
      <Box mt={6.25}>
        <PrimaryButton
          onClick={() => dispatch(answerProposition({
            id: id,
            status: PropositionStatus.ACCEPTED
          }))}
          text={t('propositions.acceptOffer')} size='small'>
          {loadingStatus === sliceStatus.LOADING &&
            <span className={classes.loading}>
              <CircularProgress color={'inherit'} size={20}/>
            </span>
          }
        </PrimaryButton>
      </Box>
    </Box>
  )
}

export default Pending