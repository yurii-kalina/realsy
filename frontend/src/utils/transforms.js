import { ConfigCategory, DealTypes } from '../constants'

export const transformSubmission = (submission) => {
  const { propertyType, propertyCategory, location, type, user, configurations, ...other } = submission
  const configs = []
  configurations.forEach(item => {
    if (item.value) {
      if (item.value.length > 0) {
        item.value.forEach(val => {
          configs.push({
            configurationValue: { id: val && val.id },
            ...val,
            configuration: {
              name: item.name,
              id: item.id,
              priority: item.priority,
              type: item.type,
              icon: item.icon,
              category: item.category,
              isSpecial: item.isSpecial
            }
          })
        })
      } else {
        configs.push({
          configurationValue: { id: item && item.value && item.value.id },
          ...item.value,
          configuration: {
            id: item.id,
            name: item.name,
            priority: item.priority,
            type: item.type,
            icon: item.icon,
            category: item.category,
            isSpecial: item.isSpecial
          }
        })
      }
    } else {
      configs.push({
        configurationValue: { id: item && item.id },
        ...item,
        configuration: {
          id: item.id,
          name: item.name,
          priority: item.priority,
          type: item.type,
          icon: item.icon,
          category: item.category,
          isSpecial: item.isSpecial
        }
      })
    }
  })
  const price = configs.find(item => item.valueText === ConfigCategory.PRICE)
  return {
    isAvailableForSale: type === DealTypes.BUY,
    isAvailableForRent: type === DealTypes.RENT,
    propertyType,
    propertyCategory,
    location,
    type,
    user,
    price: price ? price.valueNumber : 0,
    description: user ? user.description : '',
    values: configs,
    ...other
  }
}