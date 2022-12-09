package ua.com.realtor.facade;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;
import ua.com.realtor.dto.request.AdRequest;
import ua.com.realtor.dto.response.AdResponse;
import ua.com.realtor.entity.Ad;
import ua.com.realtor.service.AdService;

@Component
public class AdFacade extends AbstractDtoFacade<AdRequest, AdResponse, Ad> {
  private final AdService adService;

  @Autowired
  public AdFacade(AdService adService) {
    this.adService = adService;
  }

  public AdResponse getByIdSpecial(Long id) {
    return entityToDto(adService.getAdSpecialConfig(id));
  }

  public Page<AdResponse> findAllByUserId(Pageable pageable) {
    return adService.findAllByUserId(pageable).map(ad -> modelMapper.map(ad, AdResponse.class));
  }

}
