import React, { useEffect, useState } from 'react'
import { Box } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@material-ui/core/styles'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Icon from '../../../Icon'
import Grid from '@material-ui/core/Grid'
import { useDispatch, useSelector } from 'react-redux'
import { getSubmissionDescription } from '../../../../store/submission/selectors'
import { setSubmissionDescription } from '../../../../store/submission/slice'

const useStyles = makeStyles(theme => ({
  title: {
    color: theme.palette.text.darkGray
  },
  formControl: {
    width: '100%',
    '& .MuiOutlinedInput-root': {
      borderRadius: 15
    }
  },
  textArea: {
    display: 'flex',
    alignItems: 'flex-start',
    width: '100%',
    height: 260,
    paddingTop: 45,
    borderRadius: 15,
    backgroundColor: '#EEEFF1',
    fontSize: theme.typography.body2.fontSize,
    '& .MuiOutlinedInput-root:hover': {
      border: `1px solid ${theme.palette.primary.main}`
    }
  },
  textAreaLabel: {
    paddingTop: 5,
    color: '#BDBDBD',
    fontSize: theme.typography.body2.fontSize
  },
  infoIcon: {
    display: 'block',
    width: 28,
    margin: '0px 20px'
  },
  info: {
    width: '100%',
    height: 260,
    padding: 20,
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: 8,
    backgroundColor: theme.palette.fadedBlue,
    boxSizing: 'border-box'
  },
  infoText: {
    color: '#000000',
    fontSize: theme.typography.htmlFontSize,
    whiteSpace: 'pre-line'
  }
}))

const Description = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const adDescription = useSelector(getSubmissionDescription)
  const [description, setDescription] = useState('')

  useEffect(() => {
    if (adDescription !== '') {
      setDescription(adDescription)
    }
  }, [adDescription])

  const handleChange = (e) => {
    const { value } = e.target
    if (value.length < 7001) {
      setDescription(value)
    }
  }

  return (
    <Grid container>
      <Box mt={5}>
        <Typography variant={'body2'} className={classes.title}>
          {t('description')}
        </Typography>
        <Box display={'flex'} mt={2.5}>
          <Grid item sm={7}>
            <FormControl className={classes.formControl}>
              <InputLabel margin={'dense'} focused={false} shrink={false} variant={'outlined'}
                disableAnimation
                className={classes.textAreaLabel}>{`${t('lettersLeft')} ${description ? 7000 - description.length : 7000}/7000`}</InputLabel>
              <OutlinedInput rowsMin={5} rowsMax={10} className={classes.textArea} multiline
                name={'description'}
                value={description}
                onChange={handleChange}
                onBlur={() => dispatch(setSubmissionDescription(description))}/>
            </FormControl>
          </Grid>
          <Grid item sm={1}>
            <span className={classes.infoIcon}>
              <Icon type={'info'}/>
            </span>
          </Grid>
          <Grid item sm={4}>
            <Box className={classes.info}>
              <Typography component={'p'} variant={'body2'} className={classes.infoText}>
                {t('descriptionInfo')}
              </Typography>
            </Box>
          </Grid>
        </Box>

      </Box>
    </Grid>

  )
}

export default Description
