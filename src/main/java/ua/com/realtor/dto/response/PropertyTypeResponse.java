package ua.com.realtor.dto.response;

import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;
import lombok.EqualsAndHashCode;
import ua.com.realtor.dto.BaseDto;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
public class PropertyTypeResponse extends BaseDto {
  @JsonView({Views.Default.class, Views.CategoryFull.class, Views.ConfigurationFull.class, Views.ValueFull.class,
      Views.Header.class})
  private String name;
  @JsonView({Views.Default.class, Views.Header.class})
  private Long priority;
  @JsonView({Views.Header.class})
  private List<PropertyCategoryResponse> categories;
}
