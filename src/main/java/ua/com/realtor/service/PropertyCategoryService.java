package ua.com.realtor.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.com.realtor.entity.PropertyCategory;
import ua.com.realtor.repository.PropertyCategoryRepository;

import java.util.List;


@Service
public class PropertyCategoryService extends AbstractBaseEntityService<PropertyCategory> {

  @Autowired
  private PropertyCategoryRepository propertyCategoryRepository;

  public List<PropertyCategory> findAllByPropertyTypeIdAsc(long id) {
    return propertyCategoryRepository.findAllByPropertyTypeIdOrderByPriorityAsc(id);
  }

  public List<PropertyCategory> getAllAsc() {
    return propertyCategoryRepository.findAllByOrderByPriorityAsc();
  }

}
