package ua.com.realtor.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import ua.com.realtor.entity.Ad;
import ua.com.realtor.entity.Configuration;
import ua.com.realtor.entity.ConfigurationValue;
import ua.com.realtor.entity.District;
import ua.com.realtor.entity.Location;
import ua.com.realtor.entity.Metro;
import ua.com.realtor.entity.SubmittedValue;
import ua.com.realtor.entity.User;
import ua.com.realtor.repository.AdRepository;
import ua.com.realtor.repository.CityRepository;
import ua.com.realtor.repository.ConfigurationRepository;
import ua.com.realtor.repository.ConfigurationValueRepository;
import ua.com.realtor.repository.DistrictRepository;
import ua.com.realtor.repository.LocationRepository;
import ua.com.realtor.repository.MetroRepository;
import ua.com.realtor.repository.PropertyCategoryRepository;
import ua.com.realtor.repository.SubmittedValueRepository;
import ua.com.realtor.repository.UserRepository;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;

@Service
public class AdService extends AbstractBaseEntityService<Ad> {
  private final ConfigurationRepository configurationRepository;
  private final AdRepository adRepository;

  private final DistrictRepository districtRepository;
  private final SubmittedValueRepository submittedValueRepository;
  private final LocationRepository locationRepository;
  private final PropertyCategoryRepository propertyCategoryRepository;
  private final UserRepository userRepository;

  @Autowired
  private MetroRepository metroRepository;
  @Autowired
  private CityRepository cityRepository;
  @Autowired
  private ConfigurationValueRepository configurationValueRepository;

  @Autowired
  public AdService(SubmittedValueRepository submittedValueRepository, AdRepository adRepository,
                   LocationRepository locationRepository, ConfigurationRepository configurationRepository,
                   DistrictRepository districtRepository, PropertyCategoryRepository propertyCategoryRepository,
                   UserRepository userRepository
  ) {
    this.configurationRepository = configurationRepository;
    this.adRepository = adRepository;
    this.districtRepository = districtRepository;
    this.submittedValueRepository = submittedValueRepository;
    this.locationRepository = locationRepository;
    this.propertyCategoryRepository = propertyCategoryRepository;
    this.userRepository = userRepository;
  }

  @Override
  public Ad findById(long id) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String phone = authentication.getName();
    User user = userRepository.findByPhone(phone);
    Ad ad = adRepository.findById(id).orElse(null);
    if (ad == null) {
      throw new EntityNotFoundException("Not found");
    }
    if (user != null && !user.getId().equals(ad.getUser().getId())) {
      ad.setViews(ad.getViews() + 1);
      return adRepository.save(ad);
    }
    return ad;
  }

  public List<Ad> getAdsByIds(List<Long> ids) {
    List<Ad> ads = new ArrayList<>();
    ids.forEach(id -> ads.add(adRepository.findById(id).orElse(null)));
    ads.forEach(ad -> ad.getValues().removeIf(value -> !value.getConfiguration().isSpecial()));
    return ads;
  }

  public Page<Ad> findAllByUserId(Pageable pageable) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String phone = authentication.getName();
    User user = userRepository.findByPhone(phone);
    if (user == null) {
      throw new AccessDeniedException("Accesss denied");
    } else {
      Page<Ad> page = adRepository.findAllByUserId(pageable, user.getId());
      page.getContent().forEach(ad -> ad.getValues().removeIf(value -> !value.getConfiguration().isSpecial()));
      return page;
    }
  }

  public Ad getAdSpecialConfig(Long id) {
    Ad ad = adRepository.findById(id).orElse(null);
    if (ad != null) {
      ad.getValues().removeIf(value -> !value.getConfiguration().isSpecial());
      return ad;
    }
    return null;
  }

  @Override
  public Ad create(Ad entity) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String phone = authentication.getName();
    List<SubmittedValue> values = entity.getValues();
    entity.setValues(null);
    entity.setPropertyCategory(propertyCategoryRepository.getOne(entity.getPropertyCategory().getId()));
    User user = userRepository.findByPhone(phone);
    if (user != null) {
      entity.setUser(user);
      Location location = entity.getLocation();
      entity.setLocation(null);
      List<District> districts = new ArrayList<>();
      List<Metro> metros = new ArrayList<>();
      if (location.getDistricts() != null) {
        location.getDistricts().forEach(item ->
            districts.add(districtRepository.getOne(item.getId()))
        );
      }
      if (location.getMetros() != null) {
        location.getMetros().forEach(item ->
            metros.add(metroRepository.getOne(item.getId()))
        );
      }

      location.setDistricts(districts);
      location.setMetros(metros);
      location.setCity(cityRepository.getOne(location.getCity().getId()));
      Location savedLocation = locationRepository.save(location);
      entity.setLocation(savedLocation);
      Ad ad = adRepository.save(entity);

      values.forEach(item -> {
        Configuration configuration = item.getConfiguration();
        ConfigurationValue configurationValue = item.getConfigurationValue();
        if (configuration != null) {
          item.setConfiguration(configurationRepository.findById(configuration.getId()).orElse(null));
          if (configurationValue != null && configurationValue.getId() != null) {
            item.setConfigurationValue(configurationValueRepository.getOne(configurationValue.getId()));
          } else {
            item.setConfigurationValue(null);
          }
          item.setAd(ad);
        }
      });
      List<SubmittedValue> savedValues = submittedValueRepository.saveAll(values);
      ad.setValues(savedValues);
      ad.setLocation(savedLocation);
      return adRepository.save(ad);
    }
    return null;
  }

  @Override
  public List<Ad> getAll() {
    List<Ad> ads = adRepository.findAll();
    ads.forEach(ad -> ad.getValues().removeIf(value -> !value.getConfiguration().isSpecial()));
    return ads;
  }
}
