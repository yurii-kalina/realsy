package ua.com.realtor.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import ua.com.realtor.entity.Ad;
import ua.com.realtor.entity.Favorite;
import ua.com.realtor.entity.User;
import ua.com.realtor.repository.AdRepository;
import ua.com.realtor.repository.FavoriteRepository;
import ua.com.realtor.repository.PropertyRepository;
import ua.com.realtor.repository.UserRepository;

import javax.persistence.EntityNotFoundException;
import java.util.List;

import static ua.com.realtor.constant.ApiConstants.ACCESS_DENIED_MESSAGE;

@Service
public class FavoriteService extends AbstractBaseEntityService<Favorite> {

  private final FavoriteRepository favoriteRepository;
  private final UserRepository userRepository;
  private final AdRepository adRepository;
  private final PropertyRepository propertyRepository;

  @Autowired
  public FavoriteService(FavoriteRepository favoriteRepository, UserRepository userRepository,
                         AdRepository adRepository, PropertyRepository propertyRepository) {
    this.favoriteRepository = favoriteRepository;
    this.userRepository = userRepository;
    this.adRepository = adRepository;
    this.propertyRepository = propertyRepository;
  }

  public Page<Favorite> getAllByUserId(Pageable pageable) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String phone = authentication.getName();
    User user = userRepository.findByPhone(phone);
    if (user == null) {
      throw new AccessDeniedException(ACCESS_DENIED_MESSAGE);
    } else {
      Page<Favorite> page = favoriteRepository.findAllByUserId(pageable, user.getId());
      page.getContent().forEach(fav -> fav.getAd().getValues().removeIf(value -> !value.getConfiguration().isSpecial()));
      return favoriteRepository.findAllByUserId(pageable, user.getId());
    }
  }

  public Page<Favorite> getUserFavoriteAds(Pageable pageable) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String phone = authentication.getName();
    User user = userRepository.findByPhone(phone);
    if (user == null) {
      throw new AccessDeniedException(ACCESS_DENIED_MESSAGE);
    } else {
      Page<Favorite> page = favoriteRepository.findAllByUserIdAndPropertyIsNull(pageable, user.getId());
      page.getContent().forEach(fav -> fav.getAd().getValues().removeIf(value -> !value.getConfiguration().isSpecial()));
      return favoriteRepository.findAllByUserIdAndPropertyIsNull(pageable, user.getId());
    }
  }

  public Page<Favorite> getUserFavoriteProperties(Pageable pageable) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String phone = authentication.getName();
    User user = userRepository.findByPhone(phone);
    if (user == null) {
      throw new AccessDeniedException(ACCESS_DENIED_MESSAGE);
    } else {
      Page<Favorite> page = favoriteRepository.findAllByUserIdAndAdIsNull(pageable, user.getId());
      page.getContent()
          .forEach(fav -> fav.getProperty().getValues().removeIf(value -> !value.getConfiguration().isSpecial()));
      return favoriteRepository.findAllByUserIdAndAdIsNull(pageable, user.getId());
    }
  }

  public List<Long> getFavoriteAds() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String phone = authentication.getName();
    User user = userRepository.findByPhone(phone);
    if (user == null) {
      throw new AccessDeniedException(ACCESS_DENIED_MESSAGE);
    } else {
      return favoriteRepository.findAdsByUserId(user.getId());
    }
  }

  public List<Long> getFavoriteProperties() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String phone = authentication.getName();
    User user = userRepository.findByPhone(phone);
    if (user == null) {
      throw new AccessDeniedException(ACCESS_DENIED_MESSAGE);
    } else {
      return favoriteRepository.findPropertiesByUserId(user.getId());
    }
  }

  public Favorite saveFavorite(Long adId, Long propertyId) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String phone = authentication.getName();
    User user = userRepository.findByPhone(phone);
    if (user == null) {
      throw new AccessDeniedException(ACCESS_DENIED_MESSAGE);
    } else {
      Favorite candidate = favoriteRepository.findByUserIdAndAdIdAndPropertyId(user.getId(), adId, propertyId);
      if (candidate != null) {
        return null;
      } else {
        Favorite favorite = new Favorite();
        favorite.setUser(user);
        if (adId == null) {
          favorite.setProperty(propertyRepository.getOne(propertyId));
          favorite.setAd(null);
        } else {
          Ad saved = adRepository.findById(adId).orElse(null);
          if (saved != null) {
            saved.setSaved(saved.getSaved() + 1);
            favorite.setAd(adRepository.save(saved));
            favorite.setProperty(null);
          }
        }
        return favoriteRepository.save(favorite);
      }
    }
  }


  public Favorite deleteFavorite(Long adId, Long propertyId) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String phone = authentication.getName();
    User user = userRepository.findByPhone(phone);
    if (user == null) {
      throw new AccessDeniedException(ACCESS_DENIED_MESSAGE);
    } else {
      Favorite candidate = favoriteRepository.findByUserIdAndAdIdAndPropertyId(user.getId(), adId, propertyId);
      if (candidate == null) {
        throw new EntityNotFoundException();
      } else {
        favoriteRepository.delete(candidate);
        return candidate;
      }
    }
  }


}
