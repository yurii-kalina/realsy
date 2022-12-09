package ua.com.realtor.facade;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;
import ua.com.realtor.dto.request.PropertyRequest;
import ua.com.realtor.dto.response.AdResponse;
import ua.com.realtor.dto.response.PropertyResponse;
import ua.com.realtor.entity.Property;
import ua.com.realtor.entity.PropertyAdRelevance;
import ua.com.realtor.service.PropertyService;

import java.util.ArrayList;
import java.util.List;

@Component
public class PropertyFacade extends AbstractDtoFacade<PropertyRequest, PropertyResponse, Property> {
  private final PropertyService propertyService;
  private final AdFacade adFacade;

  @Autowired
  public PropertyFacade(PropertyService propertyService, AdFacade adFacade) {
    this.propertyService = propertyService;
    this.adFacade = adFacade;
  }

  public List<PropertyAdRelevance> getRelevances(Long id) {
    return propertyService.getAds(id);
  }

  public List<AdResponse> getAds(Long id) {
    List<PropertyAdRelevance> foundAds = propertyService.getAds(id);
    List<AdResponse> ads = new ArrayList<>();
    foundAds.forEach(ad -> ads.add(adFacade.getByIdSpecial(ad.getAd())));
    return ads;
  }

  public Page<PropertyResponse> findAll(Pageable pageable) {
    return propertyService.findAll(pageable).map(property -> modelMapper.map(property, PropertyResponse.class));
  }
}
