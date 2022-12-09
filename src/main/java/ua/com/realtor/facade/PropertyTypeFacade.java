package ua.com.realtor.facade;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ua.com.realtor.dto.request.PropertyTypeRequest;
import ua.com.realtor.dto.response.PropertyTypeResponse;
import ua.com.realtor.entity.PropertyType;
import ua.com.realtor.service.PropertyTypeService;

import java.util.List;

@Component
public class PropertyTypeFacade extends AbstractDtoFacade<PropertyTypeRequest, PropertyTypeResponse, PropertyType> {

  private final PropertyTypeService propertyTypeService;

  @Autowired
  public PropertyTypeFacade(PropertyTypeService propertyTypeService) {
    this.propertyTypeService = propertyTypeService;
  }

  public List<PropertyTypeResponse> getHeaderConfigurations() {
    List<PropertyTypeResponse> types = entitiesToDtoList(propertyTypeService.getAllAsc());
    types.forEach(type -> type.getCategories()
        .forEach(category -> category.getConfigurations().removeIf(config -> !config.getIsHeader())));
    return types;
  }

  public List<PropertyTypeResponse> getAllAsc() {
    return entitiesToDtoList(propertyTypeService.getAllAsc());
  }
}
