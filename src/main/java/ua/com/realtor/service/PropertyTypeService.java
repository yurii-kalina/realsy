package ua.com.realtor.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.com.realtor.entity.PropertyType;
import ua.com.realtor.repository.PropertyTypeRepository;

import java.util.List;

@Service
public class PropertyTypeService extends AbstractBaseEntityService<PropertyType> {

  private final PropertyTypeRepository propertyTypeRepository;

  @Autowired
  public PropertyTypeService(PropertyTypeRepository propertyTypeRepository) {
    this.propertyTypeRepository = propertyTypeRepository;
  }

  public List<PropertyType> getAllAsc() {
    return propertyTypeRepository.findAllByOrderByPriorityAsc();
  }
}
