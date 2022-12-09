package ua.com.realtor.dto.response;

import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;
import ua.com.realtor.dto.BaseDto;

@Data
public class ConfigurationTypeResponse extends BaseDto {
  @JsonView({Views.Default.class, Views.CategoryFull.class, Views.AdList.class, Views.Ad.class, Views.Property.class,
      Views.Propositions.class})
  private String name;
}
