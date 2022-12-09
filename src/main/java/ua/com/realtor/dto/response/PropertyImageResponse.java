package ua.com.realtor.dto.response;

import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;
import lombok.EqualsAndHashCode;
import ua.com.realtor.dto.BaseDto;

@Data
@EqualsAndHashCode(callSuper = true)
public class PropertyImageResponse extends BaseDto {
  @JsonView({Views.Property.class, Views.PropertyImage.class, Views.Propositions.class})
  private String url;
}
