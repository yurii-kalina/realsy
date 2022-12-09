import React from 'react'
import Typography from '@material-ui/core/Typography'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Box from '@material-ui/core/Box'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Photo from '../Submission/Create/Final/Photo'
import UserInfo from '../Submission/Create/Final/UserInfo'
import Description from '../Submission/Create/Final/Description'
import Tab from '../common/tab/Tab'
import PrimaryButton from '../common/buttons/PrimaryButton'
import { useDispatch, useSelector } from 'react-redux'
import { setUserInfo } from '../../store/user/slice'
import Grid from '@material-ui/core/Grid'
import { sliceStatus } from '../../store/sliceStatus'
import CircularProgress from '@material-ui/core/CircularProgress'
import { getSubmission } from '../../store/submission/selectors'
import { submitAd } from '../../store/ad/thunks'
import { setSubmissionEmpty, setSubmissionPreview } from '../../store/submission/slice'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ToastError from '../Error/ToastError'
import { Paths } from '../../constants'
import { selectUserInfo } from '../../store/user/selectors'
import { selectAdItem } from '../../store/ad/selectors'

const useStyles = makeStyles(theme => ({
  form: {
    borderBottom: theme.border
  },
  loading: {
    marginTop: theme.spacing(0.4),
    padding: theme.spacing(1.25),
    color: 'white'
  }
}))

const FinalStep = ({ handleStep, step }) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const classes = useStyles()
  const dispatch = useDispatch()
  const submission = useSelector(getSubmission)
  const { status } = useSelector(selectAdItem)
  const user = useSelector(selectUserInfo)

  const history = useHistory()

  const handleFields = (field) => {
    const { name, value } = field
    if (name) {
      dispatch(setUserInfo({ name, value }))
    }
  }

  const handleSubmit = async () => {
    const result = await dispatch(submitAd(submission))
    if (result && result.payload && result.payload.id) {
      dispatch(setSubmissionEmpty())
      history.push(`${Paths.AD}/${result.payload.id}`)
    } else if (result.error) {
      toast.error(<ToastError error={result.error.message}/>)
    }
  }

  const handlePreview = () => {
    dispatch(setSubmissionPreview({ ...submission, user }))
    handleStep(4)
  }
  return (
    <Grid container>
      <Grid item sm={12}>
        <Box px={4.25} py={6.25} display={'flex'} flexWrap={'wrap'} className={classes.form}>
          <Box px={10}>
            <Typography variant={'body2'} component={'p'} color={'textPrimary'} align={'center'}>
              {t('fillInformation')}
            </Typography>
          </Box>
          <Box display={'flex'} width={1} mt={4.37}>
            <Photo/>
            <UserInfo onBlur={handleFields}/>
          </Box>
          <Box>
            <Description/>
          </Box>
        </Box>
      </Grid>
      {submission && submission.price && <Box display={'flex'}>
        <Tab title={t('price')} value={`${submission.price} UAH`} roundedSide={'bottomRounded'}/>
      </Box>}
      <Box display={'flex'} flexBasis={'100%'} mt={6.25} justifyContent={'center'}>
        <PrimaryButton text={t('check')} variant={'bordered'} fontSize={theme.typography.body1.fontSize}
          onClick={handlePreview}/>
        <Box ml={6.25}>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={true}
            closeOnClick
            rtl={false}
            pauseOnHover
          />
          <PrimaryButton text={t('publish')} fontSize={theme.typography.body1.fontSize}
            onClick={handleSubmit}>
            {status === sliceStatus.LOADING &&
                        <span className={classes.loading}>
                          <CircularProgress color={'inherit'} size={20}/>
                        </span>
            }
          </PrimaryButton>
        </Box>
      </Box>
    </Grid>

  )
}

export default FinalStep
