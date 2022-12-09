import React from 'react'
import { useTranslation } from 'react-i18next'
import Typography from '@material-ui/core/Typography'

const ToastError = ({ error }) => {
  const { t } = useTranslation()
  return (
    <div>
      <Typography component='p' variant='subtitle1'>{t('somethingWrong')}</Typography>
      <Typography component='p' variant='subtitle2'>{error && <p>{error}</p>}</Typography>
    </div>
  )
}

export default ToastError