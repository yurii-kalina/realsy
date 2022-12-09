import React, { useEffect, useRef, useState } from 'react'
import Typography from '@material-ui/core/Typography'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Box from '@material-ui/core/Box'
import { useDispatch, useSelector } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'
import { getName, getSubmission } from '../../../store/submission/selectors'
import { setSubmissionEmpty, setSubmissionName } from '../../../store/submission/slice'
import Description from '../../Submission/Create/Final/Description'
import Tab from '../../common/tab/Tab'
import PrimaryButton from '../../common/buttons/PrimaryButton'
import { sliceStatus } from '../../../store/sliceStatus'
import { submitProperty, submitPropertyImage } from '../../../store/property/thunks'
import { useTheme } from '@material-ui/core'
import { Paths } from '../../../constants'
import { toast } from 'react-toastify'
import ToastError from '../../Error/ToastError'
import { selectProperty } from '../../../store/property/selectors'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles(theme => ({
  file: {
    display: 'none'
  },
  form: {
    borderBottom: theme.border
  },
  loading: {
    marginTop: theme.spacing(0.4),
    padding: theme.spacing(1.25),
    color: 'white'
  },
  input: {
    height: 50,
    borderRadius: 8,
    fontSize: theme.typography.body2.fontSize,
    '& .MuiSelect-select:focus': {
      backgroundColor: 'transparent'
    },
    '& .MuiOutlinedInput-input': {
      padding: '13.5px 14px'
    }
  },
  selectPlaceholder: {
    color: theme.palette.text.secondary
  }
}))

const FinalStep = ({ handleStep, step }) => {
  const { t } = useTranslation()
  const [files, setFile] = useState(null)
  const theme = useTheme()
  const classes = useStyles()
  const dispatch = useDispatch()
  const submission = useSelector(getSubmission)
  const { status } = useSelector(selectProperty)
  const history = useHistory()
  const [name, setName] = useState('')
  const propertyName = useSelector(getName)
  const uploadRef = useRef(null)

  useEffect(() => {
    if (propertyName !== '') {
      setName(propertyName)
    }
  }, [propertyName])

  const handleSubmit = async () => {
    const result = await dispatch(submitProperty(submission))
    if (result && result.payload && result.payload.id) {
      dispatch(setSubmissionEmpty())
      dispatch(submitPropertyImage({
        id: result.payload.id,
        files
      }))
      history.push(`${Paths.PROPERTY}/${result.payload.id}`)
    } else if (result.error) {
      toast.error(<ToastError error={result.error.message}/>)
    }
  }

  const handleUpload = () => {
    if (uploadRef && uploadRef.current) {
      uploadRef.current.click()
    }
  }

  const handleFileChange = (e) => {
    setFile(e.target.files)
  }

  return (
    <Grid container>
      <Grid item sm={12}>
        <Box px={4.25} py={6.25} display={'flex'} flexWrap={'wrap'} className={classes.form}>
          <Box flexBasis='100%'>
            <TextField onChange={(e) => setName(e.target.value)} fullWidth value={name} margin={'none'} name={'name'}
              className={classes.input}
              placeholder={t('propertyName')}
              onBlur={(e) => dispatch(setSubmissionName(name))}/>
            <Box py={4}>
              <Typography variant={'body1'} component={'p'} color={'textPrimary'} align={'center'}>
                {t('addPhotos')}
              </Typography>
              <Box width={1} py={4} display='flex' justifyContent='center' alignItems='center'>
                <PrimaryButton text={t('selectFiles')} onClick={handleUpload} size='medium'/>
                {files && files.length > 0 &&
                <Box ml={2}>{`${t('numberOfFiles')}: ${files && files.length > 0 && files.length}`}</Box>}
                <input type='file' multiple ref={uploadRef} onChange={handleFileChange} name={'file'}
                  className={classes.file}/>
              </Box>
            </Box>
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
        <PrimaryButton text={t('publish')} fontSize={theme.typography.body1.fontSize}
          onClick={handleSubmit}>
          {status === sliceStatus.LOADING &&
          <span className={classes.loading}>
            <CircularProgress color={'inherit'} size={20}/>
          </span>
          }
        </PrimaryButton>
      </Box>
    </Grid>
  )
}

export default FinalStep
