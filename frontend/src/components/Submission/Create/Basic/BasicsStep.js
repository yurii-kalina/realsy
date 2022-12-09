import React from 'react'
import { useSelector } from 'react-redux'
import DealType from './DealType'
import Location from './Location/Location'
import PropertyType from './PropertyType'
import PropertyCategories from './PropertyCategories'
import BasicConfigCategory from '../../../Configuration/BasicConfigCategory'
import { getSubmission } from '../../../../store/submission/selectors'

const BasicsStep = ({ handleStep }) => {
  const { location, type, propertyType, propertyCategory } = useSelector(getSubmission)
  return (
    <>
      <DealType/>
      {type && <Location/>}
      {location && type && <PropertyType/>}
      {propertyType && <PropertyCategories/>}
      {propertyCategory && <BasicConfigCategory step={'basics'} handleStep={handleStep}/>}
    </>
  )
}

export default BasicsStep
