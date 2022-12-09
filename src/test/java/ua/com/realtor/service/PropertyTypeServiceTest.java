package ua.com.realtor.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import ua.com.realtor.entity.PropertyType;
import ua.com.realtor.repository.PropertyTypeRepository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;


@SpringBootTest
class PropertyTypeServiceTest {

  @MockBean
  private PropertyTypeRepository propertyTypeRepository;
  @Autowired
  private PropertyTypeService propertyTypeService;

  @Test
  void findById() {
    PropertyType propertyType = new PropertyType();
    propertyType.setId(1L);
    propertyType.setName("commercial");
    when(propertyTypeRepository.save(propertyType)).thenReturn(propertyType);
    assertThat(propertyTypeService.create(propertyType)).isEqualTo(propertyType);
  }

  @TestConfiguration
  static class PropertyTypeServiceTestConfiguration {
    @Bean
    public PropertyTypeService propertyTypeService(PropertyTypeRepository propertyTypeRepository) {
      return new PropertyTypeService(propertyTypeRepository);
    }
  }
}