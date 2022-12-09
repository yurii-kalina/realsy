import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import Icon from '../../../../Icon'
import { makeStyles } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { setSubmissionExactAddress } from '../../../../../store/submission/slice'

const useStyles = makeStyles(theme => ({
  input: {
    padding: '20px 10px',
    display: 'block'
  },
  text: {
    fontSize: theme.typography.body2.fontSize,
    color: theme.palette.text.primary
  }

}))

const ExactAddress = props => {
  const classes = useStyles()
  const [address, setAddress] = useState('')
  const dispatch = useDispatch()

  return (

    <TextField className={classes.input} fullWidth margin={'dense'} value={address}
      onBlur={() => dispatch(setSubmissionExactAddress(address))}
      onChange={(e) => setAddress(e.target.value)} InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <span style={{ width: 35, padding: '0 4px' }}>
              <Icon type={'location'}/>
            </span>
          </InputAdornment>
        )
      }}/>
  )
}

export default ExactAddress
