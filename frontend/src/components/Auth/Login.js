import React, { useEffect, useState } from 'react'
import PhoneMask from '../common/inputs/PhoneMask/PhoneMask'
import { useHistory, useLocation } from 'react-router-dom'
import InputAdornment from '@material-ui/core/InputAdornment'
import Icon from '../Icon'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import { useTranslation } from 'react-i18next'
import Checkbox from '../common/buttons/Checkbox'
import Box from '@material-ui/core/Box'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import PrimaryButton from '../common/buttons/PrimaryButton'
import Grid from '@material-ui/core/Grid'
import AuthHeading from './AuthHeading'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '../../store/user/selectors'
import { fetchUserInfo, login } from '../../store/user/thunks'
import { sliceStatus } from '../../store/sliceStatus'
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'

const useStyles = makeStyles(theme => ({
  input: {
    width: 568,
    height: 75,
    borderRadius: 10,
    background: '#FFF',
    boxSizing: 'border-box'
  },
  forgot: {
    color: theme.palette.text.lightGray,
    fontSize: theme.typography.body1.fontSize,
    cursor: 'pointer'
  },
  joinWith: {
    display: 'block',
    width: '100%',
    textAlign: 'center',
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
  },
  error: {
    display: 'block',
    height: 40,
    paddingBottom: theme.spacing(1),
    color: 'red',
    fontSize: theme.typography.body2.fontSize
  }
}))

const Login = props => {
  const classes = useStyles()
  const history = useHistory()
  const location = useLocation()
  const { t } = useTranslation()
  const theme = useTheme()
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      phone: '',
      fullName: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: Yup.object({
      phone: Yup.string().required(t('auth.enterPhone')),
      password: Yup.string().required(t('auth.enterPassword'))
    }),
    onSubmit: (values) => {
      return dispatch(login(values))
    }
  })

  const [remember, setRemember] = useState(false)
  const { user, status, token } = useSelector(selectUser)

  const handleLogin = () => {
    dispatch(login({ phone: formik.values.phone, password: formik.values.password }))
  }

  useEffect(() => {
    if (status === sliceStatus.SUCCEEDED && token) {
      if (!user) {
        dispatch(fetchUserInfo(token))
      } else {
        if (location && location.state && location.state.from && location.state.from.pathname) {
          history.push(location.state.from.pathname)
        } else history.push('/users/profile')
      }
    }
  }, [dispatch, history, location, status, token, user])

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
          {t('auth.loginText')}
        </Typography>
      </AuthHeading>
      <form>
        <Grid container>
          <Grid item sm={12}>
            <FormControl className={classes.inputContainer}>
              <FormHelperText
                className={classes.error}>{(formik.touched.phone && formik.errors.phone)}</FormHelperText>
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
                error={(formik.touched.phone && Boolean(formik.errors.phone))}
              />
            </FormControl>
          </Grid>
          <Grid item sm={12}>
            <FormControl className={classes.inputContainer}>
              <FormHelperText
                className={classes.error}>{(formik.touched.password && formik.errors.password)}</FormHelperText>
              <OutlinedInput className={classes.input}
                fullWidth margin='dense'
                type='password'
                name='password'
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={(formik.touched.password && Boolean(formik.errors.password))}
                placeholder={t('auth.password')}
                inputProps={{ className: classes.input }}
                startAdornment={textFieldIcon('password')}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Box mt={2.5} maxWidth={568} display={'flex'} justifyContent={'space-between'}>
          <Checkbox
            width={30}
            isActive={remember}
            textColor={theme.palette.text.lightGray}
            onClick={() => setRemember(!remember)}
            text={t('auth.rememberMe')}
            fontSize={theme.typography.body1.fontSize}
            activeColor={theme.palette.secondary.main}
          />
          <Link underline='none' className={classes.forgot}>
            {t('auth.forgotPassword')}
          </Link>
        </Box>
        <Box py={7.5} display={'flex'}>
          <PrimaryButton onClick={handleLogin} text={t('auth.loginNow')} width={236} height={62}
            fontSize={theme.typography.h5.fontSize} color='#fff'>
            {status === sliceStatus.LOADING &&
            <span className={classes.loading}>
              <CircularProgress color={'inherit'} size={20}/>
            </span>
            }
          </PrimaryButton>
          <Box ml={2}>
            <PrimaryButton onClick={() => history.push('/users/register')} text={t('auth.createAccount')}
              variant={'bordered'} width={236} height={62} fontSize={theme.typography.h5.fontSize}
              color={theme.palette.text.authGray}/>
          </Box>
        </Box>
      </form>
      <Grid container spacing={2} alignItems={'center'}>
        <Grid item sm={3}>
          <Box borderBottom={1} borderColor='text.darkGray'/>
        </Grid>
        <Grid item sm={6} >
          <Typography fontSize={theme.typography.h5.fontSize} className={classes.joinWith} component={'span'}>
            {t('auth.orJoinWith')}
          </Typography>
        </Grid>
        <Grid item sm={3}>
          <Box borderBottom={1} borderColor='text.darkGray'/>
        </Grid>
      </Grid>
      <Box display={'flex'} justifyContent={'center'} pb={2}>
        <span className={classes.social} style={{ backgroundColor: '#ED3A3A' }}>
          <Icon type='googlePlus' size={35}/>
        </span>
        <span className={classes.social} style={{ backgroundColor: '#3C5A99' }}>
          <Icon type='facebook' size={28}/>
        </span>
        <span className={classes.social} style={{ backgroundColor: '#007AB9' }}>
          <Icon type='linkedin' size={29}/>
        </span>
        <span className={classes.social} style={{ backgroundColor: '#33CCFF' }}>
          <Icon type='twitter' size={32}/>
        </span>
      </Box>
    </>
  )
}

export default Login
