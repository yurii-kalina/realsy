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
import ua.com.realtor.dto.response.PropertyTypeResponse;
import ua.com.realtor.dto.response.Views;
import ua.com.realtor.facade.PropertyTypeFacade;

import java.util.List;

@RestController
@RequestMapping(value = "/api/" + ApiConstants.API_VERSION + "/property/type")
public class PropertyTypeController {
  private final PropertyTypeFacade propertyTypeFacade;

  @Autowired
  public PropertyTypeController(@NonNull PropertyTypeFacade propertyTypeFacade) {
    this.propertyTypeFacade = propertyTypeFacade;
  }

  @GetMapping
  @JsonView({Views.Default.class})
  public ResponseEntity<List<PropertyTypeResponse>> getAllAsc() {
    return ResponseEntity.ok(propertyTypeFacade.getAllAsc());
  }

  @GetMapping("/configurations")
  @JsonView({Views.Header.class})
  public ResponseEntity<List<PropertyTypeResponse>> getHeaderConfigurations() {
    return ResponseEntity.ok(propertyTypeFacade.getHeaderConfigurations());
  }


  @GetMapping("/{id}")
  @JsonView({Views.Default.class})
  public ResponseEntity<PropertyTypeResponse> findById(@PathVariable long id) {
    return ResponseEntity.ok(propertyTypeFacade.findById(id));
  }
}
