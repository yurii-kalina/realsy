package ua.com.realtor.facade;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;
import ua.com.realtor.dto.request.FavoriteRequest;
import ua.com.realtor.dto.response.FavoriteListResponse;
import ua.com.realtor.dto.response.FavoriteResponse;
import ua.com.realtor.entity.Favorite;
import ua.com.realtor.service.FavoriteService;


@Component
public class FavoriteFacade extends AbstractDtoFacade<FavoriteRequest, FavoriteResponse, Favorite> {

  private final FavoriteService favoriteService;

  @Autowired
  public FavoriteFacade(FavoriteService favoriteService) {
    this.favoriteService = favoriteService;
  }


  public Page<FavoriteResponse> findAllByUserId(Pageable pageable) {
    return favoriteService.getAllByUserId(pageable).map(favorite -> modelMapper.map(favorite, FavoriteResponse.class));
  }

  public Page<FavoriteResponse> findUserFavoriteAds(Pageable pageable) {
    return favoriteService.getUserFavoriteAds(pageable).map(favorite -> modelMapper.map(favorite, FavoriteResponse.class));
  }

  public Page<FavoriteResponse> findUserFavoriteProperties(Pageable pageable) {
    return favoriteService.getUserFavoriteProperties(pageable)
        .map(favorite -> modelMapper.map(favorite, FavoriteResponse.class));
  }

  public FavoriteListResponse findAllIdsByUserId() {
    FavoriteListResponse response = new FavoriteListResponse();
    response.setAds(favoriteService.getFavoriteAds());
    response.setProperties(favoriteService.getFavoriteProperties());
    return response;
  }


  public FavoriteResponse saveFavorite(Long adId, Long propertyId) {
    return entityToDto(favoriteService.saveFavorite(adId, propertyId));
  }

  public FavoriteResponse deleteFavorite(Long adId, Long propertyId) {
    return entityToDto(favoriteService.deleteFavorite(adId, propertyId));
  }

}

