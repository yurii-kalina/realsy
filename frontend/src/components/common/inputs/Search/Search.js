import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputBase from '@material-ui/core/InputBase/InputBase'
import InputAdornment from '@material-ui/core/InputAdornment'
import Box from '@material-ui/core/Box'
import Icon from '../../../Icon'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  input: props => ({
    width: '100%',
    maxWidth: props.maxWidth || 400,
    height: 50,
    padding: `${theme.spacing(1.375)}px ${theme.spacing(3)}px`,
    borderRadius: 8,
    background: '#EEEFF1',
    boxSizing: 'border-box',
    fontSize: props.fontSize || theme.typography.body1.fontSize
  })
}))
const Search = ({ maxWidth, placeholder, fontSize }) => {
  const classes = useStyles({ maxWidth, fontSize })
  return (
    <FormControl className={classes.inputContainer}>
      <InputBase
        className={classes.input}
        variant='outlined'
        placeholder={placeholder}
        startAdornment={
          <InputAdornment position="start">
            <Box component='span' display='block' width={22}>
              <Icon type='search'/>
            </Box>
          </InputAdornment>
        }
      />
    </FormControl>
  )
}

export default Search