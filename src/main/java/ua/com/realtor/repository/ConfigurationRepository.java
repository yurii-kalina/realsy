package ua.com.realtor.repository;

import org.springframework.stereotype.Repository;
import ua.com.realtor.entity.Configuration;

import java.util.List;

@Repository
public interface ConfigurationRepository extends BaseEntityRepository<Configuration> {
  List<Configuration> findConfigurationsByCategory_Id(long id);

  Configuration findByName(String name);
}
