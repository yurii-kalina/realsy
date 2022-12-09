package ua.com.realtor.controller;

import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.com.realtor.constant.ApiConstants;
import ua.com.realtor.dto.response.CityMetroLineResponse;
import ua.com.realtor.dto.response.CityResponse;
import ua.com.realtor.dto.response.Views;
import ua.com.realtor.facade.CityFacade;

import java.util.List;

@RestController
@RequestMapping(value = "/api/" + ApiConstants.API_VERSION + "/city")
public class CityController {
  private final CityFacade cityFacade;

  @Autowired
  public CityController(CityFacade cityFacade) {
    this.cityFacade = cityFacade;
  }


  @GetMapping
  @JsonView(Views.City.class)
  public List<CityResponse> getAllCities() {
    return cityFacade.getAll();
  }

  @GetMapping("/{id}")
  @JsonView(Views.Location.class)
  public CityMetroLineResponse getCityById(@PathVariable long id) {
    return cityFacade.findByIdByMetroLine(id);
  }
}
