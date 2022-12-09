package ua.com.realtor.controller;

import com.fasterxml.jackson.annotation.JsonView;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.com.realtor.constant.ApiConstants;
import ua.com.realtor.dto.response.ConfigurationCategoryResponse;
import ua.com.realtor.dto.response.PropertyCategoryResponse;
import ua.com.realtor.dto.response.Views;
import ua.com.realtor.facade.PropertyCategoryFacade;

import java.util.List;

@RestController
@RequestMapping(value = "/api/" + ApiConstants.API_VERSION + "/property/category")
public class PropertyCategoryController {

  private final PropertyCategoryFacade propertyCategoryFacade;

  @Autowired
  public PropertyCategoryController(@NonNull PropertyCategoryFacade propertyCategoryFacade) {
    this.propertyCategoryFacade = propertyCategoryFacade;
  }

  @GetMapping
  public ResponseEntity<List<PropertyCategoryResponse>> getAll() {
    return ResponseEntity.ok(propertyCategoryFacade.getAllAsc());
  }

  @JsonView({Views.Default.class})
  @GetMapping("/type/{id}")
  public ResponseEntity<List<PropertyCategoryResponse>> getAllByTypeAsc(@PathVariable long id) {
    return ResponseEntity.ok(propertyCategoryFacade.findAllByPropertyTypeIdAsc(id));
  }

  @JsonView({Views.Default.class})
  @GetMapping("/{id}")
  public ResponseEntity<PropertyCategoryResponse> findById(@PathVariable long id) {
    return ResponseEntity.ok(propertyCategoryFacade.findById(id));
  }

  @GetMapping("/{id}/configurations")
  @JsonView({Views.CategoryFull.class})
  public ResponseEntity<List<ConfigurationCategoryResponse>> findConfigurationsById(@PathVariable long id) {
    return ResponseEntity.ok(propertyCategoryFacade.findConfigurationsByPropertyCategoryId(id));
  }


}
