package ua.com.realtor.controller;

import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ua.com.realtor.constant.ApiConstants;
import ua.com.realtor.dto.request.FavoriteRequest;
import ua.com.realtor.dto.response.FavoriteListResponse;
import ua.com.realtor.dto.response.FavoriteResponse;
import ua.com.realtor.dto.response.Views;
import ua.com.realtor.facade.FavoriteFacade;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

import static ua.com.realtor.constant.ApiConstants.TOTAL_COUNT;

@RestController
@RequestMapping(value = "/api/" + ApiConstants.API_VERSION + "/favorites")
public class FavoriteController {

  private final FavoriteFacade favoriteFacade;

  @Autowired
  public FavoriteController(FavoriteFacade favoriteFacade) {
    this.favoriteFacade = favoriteFacade;
  }

  @GetMapping
  @JsonView({Views.Favorite.class})
  public List<FavoriteResponse> getAllByUserId(
      @RequestParam(defaultValue = "0") Integer page,
      @RequestParam(defaultValue = "4") Integer size,
      @RequestParam(defaultValue = "createdAt") String sortBy,
      @RequestParam(defaultValue = "DESC") String direction,
      HttpServletResponse response
  ) {
    Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.fromString(direction), sortBy));
    Page<FavoriteResponse> favorites = favoriteFacade.findAllByUserId(pageable);
    response.setHeader(TOTAL_COUNT, String.valueOf(favorites.getTotalPages()));
    return favorites.getContent();
  }

  @GetMapping("/ads")
  @JsonView({Views.AdList.class})
  public List<FavoriteResponse> getUserFavoriteAds(
      @RequestParam(defaultValue = "0") Integer page,
      @RequestParam(defaultValue = "4") Integer size,
      @RequestParam(defaultValue = "createdAt") String sortBy,
      @RequestParam(defaultValue = "DESC") String direction,
      HttpServletResponse response
  ) {
    Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.fromString(direction), sortBy));
    Page<FavoriteResponse> favorites = favoriteFacade.findUserFavoriteAds(pageable);
    response.setHeader(TOTAL_COUNT, String.valueOf(favorites.getTotalPages()));
    return favorites.getContent();
  }

  @GetMapping("/properties")
  @JsonView({Views.PropertyList.class})
  public List<FavoriteResponse> getUserFavoriteProperties(
      @RequestParam(defaultValue = "0") Integer page,
      @RequestParam(defaultValue = "4") Integer size,
      @RequestParam(defaultValue = "createdAt") String sortBy,
      @RequestParam(defaultValue = "DESC") String direction,
      HttpServletResponse response
  ) {
    Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.fromString(direction), sortBy));
    Page<FavoriteResponse> favorites = favoriteFacade.findUserFavoriteProperties(pageable);
    response.setHeader(TOTAL_COUNT, String.valueOf(favorites.getTotalPages()));
    return favorites.getContent();
  }

  @PostMapping
  @JsonView({Views.Favorite.class})
  public FavoriteResponse saveFavorite(@RequestBody FavoriteRequest favoriteRequest) {
    return favoriteFacade.saveFavorite(favoriteRequest.getAdId(), favoriteRequest.getPropertyId());
  }

  @DeleteMapping
  @JsonView({Views.Favorite.class})
  public FavoriteResponse deleteFavorite(@RequestBody FavoriteRequest favoriteRequest) {
    return favoriteFacade.deleteFavorite(favoriteRequest.getAdId(), favoriteRequest.getPropertyId());
  }

  @GetMapping("/ids")
  public FavoriteListResponse getUserFavoritesId() {
    return favoriteFacade.findAllIdsByUserId();
  }
}