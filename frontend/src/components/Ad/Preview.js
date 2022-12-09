import React from 'react'
import AdView from './AdView'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Box from '@material-ui/core/Box'
import PrimaryButton from '../common/buttons/PrimaryButton'
import { sliceStatus } from '../../store/sliceStatus'
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { submitAdFromPreview } from '../../store/ad/thunks'
import { getSubmissionPreview } from '../../store/submission/selectors'
import { toast, ToastContainer } from 'react-toastify'
import { setSubmissionEmpty } from '../../store/submission/slice'
import { Paths } from '../../constants'
import ToastError from '../Error/ToastError'
import { selectAdItem } from '../../store/ad/selectors'

const useStyles = makeStyles(theme => ({
  loading: {
    marginTop: theme.spacing(0.4),
    padding: theme.spacing(1.25),
    color: 'white'
  },
  container: {
    background: 'url("/adViewBg.png") no-repeat',
    backgroundSize: '100%'
  },
  frame: {
    marginTop: 200,
    padding: '46px 0px',
    borderRadius: theme.modalRadius,
    backgroundColor: 'white',
    boxShadow: theme.boxShadow,
    boxSizing: 'border-box'
  }
}))

const Preview = props => {
  const { t } = useTranslation()
  const theme = useTheme()
  const classes = useStyles()
  const dispatch = useDispatch()
  const ad = useSelector(getSubmissionPreview)
  const { status } = useSelector(selectAdItem)
  const history = useHistory()

  const handleSubmit = async () => {
    const result = await dispatch(submitAdFromPreview(ad))
    if (result && result.payload && result.payload.id) {
      dispatch(setSubmissionEmpty())
      history.push(`${Paths.AD}/${result.payload.id}`)
    } else if (result.error) {
      toast.error(<ToastError error={result.error.message}/>)
    }
  }

  return (
    <Grid container justify={'center'} className={classes.container}>
      <Grid item sm={10} className={classes.frame}>
        <AdView ad={ad}>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={true}
            closeOnClick
            rtl={false}
            pauseOnHover
          />
          <Box ml={6.25} display={'flex'} justifyContent={'center'}>
            <PrimaryButton text={t('publish')} fontSize={theme.typography.body1.fontSize}
              onClick={handleSubmit}>
              {status === sliceStatus.LOADING &&
                            <span className={classes.loading}>
                              <CircularProgress color={'inherit'} size={20}/>
                            </span>
              }
            </PrimaryButton>
          </Box>
        </AdView>
      </Grid>
    </Grid>
  )
}

export default Preview
