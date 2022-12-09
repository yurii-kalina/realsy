package ua.com.realtor.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import ua.com.realtor.entity.Configuration;
import ua.com.realtor.entity.ConfigurationValue;
import ua.com.realtor.entity.District;
import ua.com.realtor.entity.Location;
import ua.com.realtor.entity.Metro;
import ua.com.realtor.entity.Property;
import ua.com.realtor.entity.PropertyAdRelevance;
import ua.com.realtor.entity.SubmittedValue;
import ua.com.realtor.entity.User;
import ua.com.realtor.repository.CityRepository;
import ua.com.realtor.repository.ConfigurationRepository;
import ua.com.realtor.repository.ConfigurationValueRepository;
import ua.com.realtor.repository.DistrictRepository;
import ua.com.realtor.repository.LocationRepository;
import ua.com.realtor.repository.MetroRepository;
import ua.com.realtor.repository.PropertyCategoryRepository;
import ua.com.realtor.repository.PropertyRepository;
import ua.com.realtor.repository.SubmittedValueRepository;
import ua.com.realtor.repository.UserRepository;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;

@Service
public class PropertyService extends AbstractBaseEntityService<Property> {
  private final ConfigurationRepository configurationRepository;
  private final PropertyRepository propertyRepository;

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
  public PropertyService(SubmittedValueRepository submittedValueRepository, PropertyRepository propertyRepository,
                         LocationRepository locationRepository, ConfigurationRepository configurationRepository,
                         DistrictRepository districtRepository, PropertyCategoryRepository propertyCategoryRepository,
                         UserRepository userRepository
  ) {
    this.configurationRepository = configurationRepository;
    this.propertyRepository = propertyRepository;
    this.districtRepository = districtRepository;
    this.submittedValueRepository = submittedValueRepository;
    this.locationRepository = locationRepository;
    this.propertyCategoryRepository = propertyCategoryRepository;
    this.userRepository = userRepository;
  }

  public List<PropertyAdRelevance> getAds(Long id) {
    return propertyRepository.getAdsRelevance(id);
  }

  public Page<Property> findAll(Pageable pageable) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String phone = authentication.getName();
    User user = userRepository.findByPhone(phone);
    if (user == null) {
      throw new AccessDeniedException("Accesss denied");
    } else {
      Page<Property> page = propertyRepository.findAllByUserId(pageable, user.getId());
      page.getContent().forEach(property -> property.getValues().removeIf(value -> !value.getConfiguration().isSpecial()));
      return page;
    }
  }

  @Override
  public Property create(Property entity) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String phone = authentication.getName();
    List<SubmittedValue> values = entity.getValues();
    entity.setValues(null);
    entity.setPropertyCategory(propertyCategoryRepository.getOne(entity.getPropertyCategory().getId()));
    User user = userRepository.findByPhone(phone);
    if (user == null) {
      throw new EntityNotFoundException("User not found");
    }
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
    Property property = propertyRepository.save(entity);
    values.forEach(item -> {
      Configuration configuration = item.getConfiguration();
      ConfigurationValue configurationValue = item.getConfigurationValue();
      if (configuration != null) {
        item.setConfiguration(configurationRepository.getOne(configuration.getId()));
        item.setProperty(property);
        if (configurationValue != null && configurationValue.getId() != null) {
          item.setConfigurationValue(configurationValueRepository.getOne(configurationValue.getId()));
        } else {
          item.setConfigurationValue(null);
        }
      }
    });
    List<SubmittedValue> savedValues = submittedValueRepository.saveAll(values);
    property.setValues(savedValues);
    property.setLocation(savedLocation);
    return propertyRepository.save(property);
  }
}
