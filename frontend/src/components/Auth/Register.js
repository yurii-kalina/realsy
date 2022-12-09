import React, { useEffect } from 'react'
import PhoneMask from '../common/inputs/PhoneMask/PhoneMask'
import { useHistory } from 'react-router-dom'
import InputAdornment from '@material-ui/core/InputAdornment'
import Icon from '../Icon'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import { useTranslation } from 'react-i18next'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import PrimaryButton from '../common/buttons/PrimaryButton'
import Grid from '@material-ui/core/Grid'
import AuthHeading from './AuthHeading'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '../../store/user/selectors'
import { fetchUserInfo, login, register } from '../../store/user/thunks'
import { sliceStatus } from '../../store/sliceStatus'
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'

const useStyles = makeStyles(theme => ({
  inputContainer: {
    marginTop: theme.spacing(2.5)
  },
  input: {
    width: 568,
    height: 75,
    borderRadius: 10,
    background: '#FFF',
    boxSizing: 'border-box',
    '&:-webkit-autofill': {
      backgroundColor: '#FFF'
    }
  },
  forgot: {
    color: theme.palette.text.lightGray,
    fontSize: theme.typography.body1.fontSize,
    cursor: 'pointer'
  },
  joinWith: {
    color: theme.palette.text.authGray
  },
  social: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 55,
    height: 55,
    marginTop: theme.spacing(2.5),
    marginLeft: theme.spacing(2.5),
    borderRadius: '50%',
    '&:first-child': {
      marginLeft: 0
    }
  },
  subtitle: {
    color: '#828282'
  },
  loading: {
    marginTop: theme.spacing(0.4),
    padding: theme.spacing(1.25),
    color: 'white'
  }
}))

const Register = () => {
  const classes = useStyles()
  const history = useHistory()
  const { t } = useTranslation()
  const theme = useTheme()
  const dispatch = useDispatch()
  const { user, status, token } = useSelector(selectUser)

  const formik = useFormik({
    initialValues: {
      phone: '',
      fullName: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .required(t('auth.nameValid')),
      phone: Yup.string().required(t('auth.enterPhone')),
      password: Yup.string().required(t('auth.enterPassword')),
      confirmPassword: Yup.string().required(t('auth.enterPassword')).oneOf([Yup.ref('password')])
    }),
    onSubmit: async (values) => {
      const result = await dispatch(register(values))
      return result
    }
  })

  useEffect(() => {
    async function postRegister () {
      if (!token) {
        await dispatch(login({ phone: formik.values.phone, password: formik.values.password }))
      } else if (token && !user) {
        await dispatch(fetchUserInfo)
      } else if (token && user) {
        history.push('/users/profile')
      }
    }

    if (status === sliceStatus.SUCCEEDED) {
      postRegister()
    }
  }, [dispatch, formik.values.password, formik.values.phone, history, status, token, user])

  const textFieldIcon = (name) => {
    return (
      <InputAdornment position="start">
        <span style={{ width: 35, padding: '0 4px' }}>
          <Icon type={name}/>
        </span>
      </InputAdornment>
    )
  }

  return (
    <>
      <AuthHeading title={t('auth.welcomeBack')}>
        <Typography component={'p'} className={classes.subtitle}>
          {t('auth.registerText')}
        </Typography>
      </AuthHeading>
      <form onSubmit={formik.handleSubmit}>
        <Grid container>
          <Grid item sm={12}>
            <FormControl className={classes.inputContainer}>
              <FormHelperText error>{(formik.touched.fullName && formik.errors.fullName)}</FormHelperText>
              <OutlinedInput className={classes.input}
                fullWidth margin='dense'
                name='fullName'
                value={formik.values.fullName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder={t('auth.fullName')}
                error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                startAdornment={textFieldIcon('username')}
                inputProps={{ className: classes.input }}
              />

            </FormControl>

          </Grid>
          <Grid item sm={12}>
            <FormControl className={classes.inputContainer}>
              <FormHelperText error>{(formik.touched.phone && formik.errors.phone)}</FormHelperText>
              <OutlinedInput className={classes.input}
                fullWidth margin='dense'
                name='phone'
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder={t('auth.phone')}
                startAdornment={textFieldIcon('mobile')}
                inputComponent={PhoneMask}
                inputProps={{ className: classes.input }}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
              />
            </FormControl>
          </Grid>
          <Grid item sm={12}>
            <FormControl className={classes.inputContainer}>
              <OutlinedInput className={classes.input}
                fullWidth margin='dense'
                type='password'
                name='password'
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                placeholder={t('auth.password')}
                inputProps={{ className: classes.input }}
                startAdornment={textFieldIcon('password')}
              />
            </FormControl>
          </Grid>
          <Grid item sm={12}>
            <FormControl className={classes.inputContainer}>
              <OutlinedInput className={classes.input}
                fullWidth margin='dense'
                type='password'
                name='confirmPassword'
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                placeholder={t('auth.confirmPassword')}
                inputProps={{ className: classes.input }}
                startAdornment={textFieldIcon('password')}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Box py={7.5} display={'flex'}>
          <PrimaryButton onClick={formik.handleSubmit} text={t('auth.loginNow')} width={236} height={62}
            fontSize={theme.typography.h5.fontSize} background={theme.palette.secondary.main}>
            {status === sliceStatus.LOADING &&
                        <span className={classes.loading}>
                          <CircularProgress color={'inherit'} size={20}/>
                        </span>
            }
          </PrimaryButton>
        </Box>
      </form>
    </>
  )
}

export default Register
