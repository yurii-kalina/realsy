package ua.com.realtor.controller;

import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ua.com.realtor.constant.ApiConstants;
import ua.com.realtor.dto.request.AdRequest;
import ua.com.realtor.dto.response.AdResponse;
import ua.com.realtor.dto.response.Views;
import ua.com.realtor.facade.AdFacade;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

import static ua.com.realtor.constant.ApiConstants.TOTAL_COUNT;

@RestController
@RequestMapping(value = "/api/" + ApiConstants.API_VERSION + "/ad")
public class AdController {
  private final AdFacade adFacade;

  @Autowired
  public AdController(AdFacade adFacade) {
    this.adFacade = adFacade;
  }

  @GetMapping
  @JsonView(Views.AdList.class)
  public List<AdResponse> getUserAds(
      @RequestParam(defaultValue = "0") Integer page,
      @RequestParam(defaultValue = "7") Integer size,
      @RequestParam(defaultValue = "createdAt") String sortBy,
      @RequestParam(defaultValue = "DESC") String direction,
      HttpServletResponse response
  ) {
    Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.fromString(direction), sortBy));
    Page<AdResponse> ads = adFacade.findAllByUserId(pageable);
    response.setHeader(TOTAL_COUNT, String.valueOf(ads.getTotalPages()));
    return ads.getContent();
  }


  @GetMapping("/{id}")
  @JsonView(Views.Ad.class)
  public AdResponse getById(@PathVariable Long id) {
    return adFacade.findById(id);
  }

  @PostMapping
  @JsonView(Views.Ad.class)
  public AdResponse createAd(@RequestBody AdRequest ad) {
    return adFacade.create(ad);
  }
}
