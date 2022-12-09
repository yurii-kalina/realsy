package ua.com.realtor.facade;

import org.springframework.stereotype.Component;
import ua.com.realtor.dto.request.ConfigurationCategoryRequest;
import ua.com.realtor.dto.response.ConfigurationCategoryResponse;
import ua.com.realtor.entity.ConfigurationCategory;


@Component
public class ConfigurationCategoryFacade
    extends AbstractDtoFacade<ConfigurationCategoryRequest, ConfigurationCategoryResponse, ConfigurationCategory> {


}
