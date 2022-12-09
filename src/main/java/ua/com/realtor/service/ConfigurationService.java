package ua.com.realtor.service;

import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.com.realtor.entity.Configuration;
import ua.com.realtor.repository.ConfigurationRepository;

import java.util.List;

@Service
public class ConfigurationService extends AbstractBaseEntityService<Configuration> {
  private final ConfigurationRepository configurationRepository;

  @Autowired
  public ConfigurationService(@NonNull ConfigurationRepository configurationRepository) {
    this.configurationRepository = configurationRepository;
  }

  public List<Configuration> findConfigurationByCategory(Long id) {
    return configurationRepository.findConfigurationsByCategory_Id(id);
  }
}
