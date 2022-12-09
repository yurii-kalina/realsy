import React from 'react'
import PropTypes from 'prop-types'
import Icon from '../../../Icon'
import clsx from 'clsx'
import { Select as MuiSelect } from '@material-ui/core'
import MenuItem from '@material-ui/core/MenuItem'
import { useStyles } from './styles'

const SelectIcon = (props) => {
  return (
    <span {...props}>
      <Icon isUnClickable={true}
        type={'arrowDown'}/>
    </span>
  )
}

const Select = ({ id, name, value, onChange, children, placeholder, width, height }) => {
  const classes = useStyles({
    width,
    height
  })
  return (
    <MuiSelect
      className={clsx(classes.input, { [classes.selectPlaceholder]: !value || value === '' })}
      name={name}
      id={id}
      value={value || ''}
      onChange={onChange}
      IconComponent={SelectIcon}
      variant={'outlined'}
      displayEmpty
      classes={{ root: classes.root }}
    >
      {placeholder ? <MenuItem value="" disabled>{placeholder}</MenuItem> : null}
      {children}
    </MuiSelect>
  )
}

Select.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.node,
  placeholder: PropTypes.string,
  onChange: PropTypes.func
}

export default Select
