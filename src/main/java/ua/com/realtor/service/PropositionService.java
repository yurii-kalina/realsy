package ua.com.realtor.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import ua.com.realtor.entity.Ad;
import ua.com.realtor.entity.Property;
import ua.com.realtor.entity.Proposition;
import ua.com.realtor.entity.User;
import ua.com.realtor.repository.AdRepository;
import ua.com.realtor.repository.PropertyRepository;
import ua.com.realtor.repository.PropositionRepository;
import ua.com.realtor.repository.UserRepository;

import javax.persistence.EntityNotFoundException;

import static ua.com.realtor.constant.ApiConstants.ACCESS_DENIED_MESSAGE;


@Service
public class PropositionService extends AbstractBaseEntityService<Proposition> {

  private final UserRepository userRepository;
  private final AdRepository adRepository;
  private final PropertyRepository propertyRepository;
  private final PropositionRepository propositionRepository;

  @Autowired
  public PropositionService(PropertyRepository propertyRepository, UserRepository userRepository,
                            PropositionRepository propositionRepository, AdRepository adRepository) {
    this.userRepository = userRepository;
    this.propositionRepository = propositionRepository;
    this.propertyRepository = propertyRepository;
    this.adRepository = adRepository;
  }

  public Proposition update(Long id, Proposition proposition) {
    Proposition toUpdate = propositionRepository.findById(id).orElse(null);
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String phone = authentication.getName();
    User user = userRepository.findByPhone(phone);
    if (toUpdate == null) {
      throw new EntityNotFoundException();
    } else if (user == null) {
      throw new AccessDeniedException("You must be logged in");
    } else {
      toUpdate.setStatus(proposition.getStatus());
      if (proposition.getClientPrice() > 0) {

        toUpdate.setClientPrice(proposition.getClientPrice());
      }
      if (proposition.getOwnerPrice() > 0 && user.getId().equals(proposition.getProperty().getUser().getId())) {
        toUpdate.setOwnerPrice(proposition.getOwnerPrice());
      }
      return propositionRepository.save(toUpdate);
    }
  }

  public Page<Proposition> findReceived(Pageable pageable) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String phone = authentication.getName();
    User user = userRepository.findByPhone(phone);
    if (user == null) {
      throw new AccessDeniedException(ACCESS_DENIED_MESSAGE);
    } else {
      return propositionRepository.findAllByAd_UserId(pageable, user.getId());
    }
  }

  public Page<Proposition> findSent(Pageable pageable) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String phone = authentication.getName();
    User user = userRepository.findByPhone(phone);
    if (user == null) {
      throw new AccessDeniedException(ACCESS_DENIED_MESSAGE);
    } else {
      Page<Proposition> page = propositionRepository.findAllByProperty_UserId(pageable, user.getId());
      page.getContent().forEach(item -> {
        Ad ad = item.getAd();
        if (ad != null) {
          ad.getValues().removeIf(value -> !value.getConfiguration().isSpecial());
        }
      });
      return page;
    }
  }

  @Override
  public Proposition create(Proposition proposition) {
    Ad ad = adRepository.findById(proposition.getAd().getId()).orElse(null);
    Property property = propertyRepository.findById(proposition.getProperty().getId()).orElse(null);
    if (ad != null && property != null) {
      proposition.setProperty(property);
      proposition.setAd(ad);
      proposition.setOwnerPrice(property.getPrice());
      return propositionRepository.save(proposition);
    }
    throw new EntityNotFoundException();
  }
}
