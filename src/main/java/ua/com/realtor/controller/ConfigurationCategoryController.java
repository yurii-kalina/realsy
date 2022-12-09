package ua.com.realtor.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.com.realtor.constant.ApiConstants;
import ua.com.realtor.dto.response.ConfigurationCategoryResponse;
import ua.com.realtor.facade.ConfigurationCategoryFacade;

import javax.validation.constraints.NotNull;
import java.util.List;

@RestController
@RequestMapping(value = "/api/" + ApiConstants.API_VERSION + "/configurations/category")
public class ConfigurationCategoryController {
  private final ConfigurationCategoryFacade configurationCategoryFacade;

  @Autowired
  public ConfigurationCategoryController(@NotNull ConfigurationCategoryFacade configurationCategoryFacade) {
    this.configurationCategoryFacade = configurationCategoryFacade;
  }

  @GetMapping
  public ResponseEntity<List<ConfigurationCategoryResponse>> findAll() {
    return ResponseEntity.ok(configurationCategoryFacade.getAll());
  }

  @GetMapping("/{id}")
  public ResponseEntity<ConfigurationCategoryResponse> findConfigurationByCategoryId(@PathVariable long id) {
    return ResponseEntity.ok(configurationCategoryFacade.findById(id));
  }

}
