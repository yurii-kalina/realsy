import React from 'react'
import FormSectionLabel from '../../../common/labels/FormSectionLabel'
import Box from '@material-ui/core/Box'

const ConfigValue = ({ text, icon, children }) => {
  return (
    <Box pr={5} pb={1.25}>
      <FormSectionLabel text={text || ''} icon={icon} iconColor={'#BDBDBD'}>
        {children}
      </FormSectionLabel>
    </Box>
  )
}

export default ConfigValue
