package ua.com.realtor.controller;

import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.com.realtor.constant.ApiConstants;
import ua.com.realtor.dto.response.MetroResponse;
import ua.com.realtor.dto.response.Views;
import ua.com.realtor.facade.MetroFacade;

import java.util.List;

@RestController
@RequestMapping(value = "/api/" + ApiConstants.API_VERSION + "/metro")

public class MetroController {

  private final MetroFacade metroFacade;

  @Autowired
  public MetroController(MetroFacade metroFacade) {
    this.metroFacade = metroFacade;
  }

  @GetMapping
  @JsonView(Views.Default.class)
  public ResponseEntity<List<MetroResponse>> getAllMetro() {
    return ResponseEntity.ok(metroFacade.getAll());
  }
}
