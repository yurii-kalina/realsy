package ua.com.realtor.controller;

import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.com.realtor.constant.ApiConstants;
import ua.com.realtor.dto.response.DistrictResponse;
import ua.com.realtor.dto.response.Views;
import ua.com.realtor.facade.DistrictFacade;

import java.util.List;

@RestController
@RequestMapping(value = "/api/" + ApiConstants.API_VERSION + "/districts")

public class DistrictController {
  private final DistrictFacade districtFacade;

  @Autowired
  public DistrictController(DistrictFacade districtFacade) {
    this.districtFacade = districtFacade;
  }

  @GetMapping
  @JsonView(Views.Default.class)
  public List<DistrictResponse> getAllDistricts() {
    return districtFacade.getAll();
  }
}
