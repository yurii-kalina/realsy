package ua.com.realtor.service;

import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.com.realtor.entity.Configuration;
import ua.com.realtor.entity.ConfigurationCategory;
import ua.com.realtor.repository.ConfigurationRepository;

import java.util.List;

@Service
public class ConfigurationCategoryService extends AbstractBaseEntityService<ConfigurationCategory> {
  private final ConfigurationRepository configurationRepository;

  @Autowired
  public ConfigurationCategoryService(@NonNull ConfigurationRepository configurationRepository) {
    this.configurationRepository = configurationRepository;
  }

  public List<Configuration> findAllByCategoryId(long id) {

    return configurationRepository.findConfigurationsByCategory_Id(id);
  }


}
