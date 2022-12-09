package ua.com.realtor.facade;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ua.com.realtor.dto.request.ConfigurationRequest;
import ua.com.realtor.dto.response.ConfigurationResponse;
import ua.com.realtor.entity.Configuration;
import ua.com.realtor.service.ConfigurationService;

import java.util.List;

@Component
public class ConfigurationFacade
    extends AbstractDtoFacade<ConfigurationRequest, ConfigurationResponse, Configuration> {

  private final ConfigurationService configurationService;

  @Autowired
  public ConfigurationFacade(ConfigurationService configurationService) {
    this.configurationService = configurationService;
  }

  public List<ConfigurationResponse> findConfigurationsByCategoryId(Long id) {
    return entitiesToDtoList(configurationService.findConfigurationByCategory(id));
  }


}
