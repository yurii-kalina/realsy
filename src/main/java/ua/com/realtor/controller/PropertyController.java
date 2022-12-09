package ua.com.realtor.controller;

import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import ua.com.realtor.constant.ApiConstants;
import ua.com.realtor.dto.request.PropertyRequest;
import ua.com.realtor.dto.response.AdResponse;
import ua.com.realtor.dto.response.PropertyImageResponse;
import ua.com.realtor.dto.response.PropertyResponse;
import ua.com.realtor.dto.response.Views;
import ua.com.realtor.entity.PropertyAdRelevance;
import ua.com.realtor.facade.PropertyFacade;
import ua.com.realtor.facade.PropertyImageFacade;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

import static ua.com.realtor.constant.ApiConstants.TOTAL_COUNT;

@RestController
@RequestMapping(value = "/api/" + ApiConstants.API_VERSION + "/property")

public class PropertyController {
  private final PropertyFacade propertyFacade;
  private final PropertyImageFacade propertyImageFacade;

  @Autowired
  public PropertyController(PropertyFacade propertyFacade,
                            PropertyImageFacade propertyImageFacade) {
    this.propertyFacade = propertyFacade;
    this.propertyImageFacade = propertyImageFacade;
  }

  @PostMapping
  @JsonView(Views.Property.class)
  public PropertyResponse create(@RequestBody PropertyRequest property) {
    return propertyFacade.create(property);
  }

  @PostMapping(value = "/images", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
  @JsonView(Views.PropertyImage.class)
  public List<PropertyImageResponse> create(@RequestParam("id") Long id, @RequestParam("file") MultipartFile[] files) {
    return propertyImageFacade.uploadImages(id, files);
  }

  @GetMapping("/{id}/ads")
  @JsonView(Views.AdList.class)
  public List<AdResponse> getAds(@PathVariable Long id) {
    return propertyFacade.getAds(id);
  }

  @GetMapping("/{id}")
  @JsonView(Views.Property.class)
  public PropertyResponse getById(@PathVariable Long id) {
    return propertyFacade.findById(id);
  }

  @GetMapping("/relevance/{id}")
  public List<PropertyAdRelevance> getRelevance(@PathVariable Long id) {
    return propertyFacade.getRelevances(id);
  }

  @GetMapping
  @JsonView(Views.PropertyList.class)
  public List<PropertyResponse> getUserProperties(
      @RequestParam(defaultValue = "0") Integer page,
      @RequestParam(defaultValue = "7") Integer size,
      @RequestParam(defaultValue = "createdAt") String sortBy,
      @RequestParam(defaultValue = "DESC") String direction,
      HttpServletResponse response
  ) {
    Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.fromString(direction), sortBy));
    Page<PropertyResponse> properties = propertyFacade.findAll(pageable);
    response.setHeader(TOTAL_COUNT, String.valueOf(properties.getTotalPages()));
    return properties.getContent();
  }

}
