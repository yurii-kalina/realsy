package ua.com.realtor.facade;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ua.com.realtor.dto.request.PropertyCategoryRequest;
import ua.com.realtor.dto.response.ConfigurationCategoryResponse;
import ua.com.realtor.dto.response.ConfigurationResponse;
import ua.com.realtor.dto.response.PropertyCategoryResponse;
import ua.com.realtor.entity.Configuration;
import ua.com.realtor.entity.ConfigurationCategory;
import ua.com.realtor.entity.PropertyCategory;
import ua.com.realtor.service.PropertyCategoryService;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class PropertyCategoryFacade
    extends AbstractDtoFacade<PropertyCategoryRequest, PropertyCategoryResponse, PropertyCategory> {

  private final PropertyCategoryService propertyCategoryService;

  @Autowired
  public PropertyCategoryFacade(PropertyCategoryService propertyCategoryService) {
    this.propertyCategoryService = propertyCategoryService;
  }

  public List<ConfigurationCategoryResponse> findConfigurationsByPropertyCategoryId(long id) {
    PropertyCategory propertyCategories = propertyCategoryService.findById(id);

    List<Configuration> configurations = propertyCategories.getConfigurations();
    Map<Long, List<Configuration>> map = configurations.stream()
        .sorted(Comparator.comparing(Configuration::getPriority))
        .collect(Collectors.groupingBy(config -> config.getCategory().getId()));

    List<ConfigurationCategoryResponse> configurationCategories = new ArrayList<>();

    for (Map.Entry<Long, List<Configuration>> entry : map.entrySet()) {
      ConfigurationCategory category = entry.getValue().get(0).getCategory();
      ConfigurationCategoryResponse configCategory = new ConfigurationCategoryResponse();
      configCategory.setId(category.getId());
      configCategory.setIcon(category.getIcon());
      configCategory.setName(category.getName());
      configCategory.setPriority(category.getPriority());
      configCategory.setCreatedAt(category.getCreatedAt());
      configCategory.setLastModifiedAt(category.getLastModifiedAt());
      configCategory.setIsDetailed(category.isDetailed());
      configCategory.setIsOnlyForRent(category.isOnlyForRent());
      configCategory.setConfigurations(entry.getValue().stream()
          .map(config -> modelMapper.map(config, ConfigurationResponse.class))
          .collect(Collectors.toList()));
      configurationCategories.sort(Comparator.comparing(ConfigurationCategoryResponse::getPriority));
      configurationCategories.add(configCategory);
    }

    return configurationCategories;
  }

  public List<PropertyCategoryResponse> getAllAsc() {
    return entitiesToDtoList(propertyCategoryService.getAllAsc());
  }

  public List<PropertyCategoryResponse> findAllByPropertyTypeIdAsc(long id) {
    return entitiesToDtoList(propertyCategoryService.findAllByPropertyTypeIdAsc(id));
  }

}
