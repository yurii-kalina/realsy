package ua.com.realtor.dto.response;

import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;
import lombok.EqualsAndHashCode;
import ua.com.realtor.dto.BaseDto;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
public class ConfigurationCategoryResponse extends BaseDto {
  @JsonView({Views.Default.class, Views.CategoryFull.class, Views.PropertyList.class, Views.AdList.class,
      Views.PropertyList.class, Views.Ad.class, Views.Propositions.class})
  private String name;

  @JsonView({Views.Default.class, Views.CategoryFull.class, Views.PropertyList.class, Views.Ad.class,
      Views.Propositions.class})
  private String icon;

  @JsonView({Views.Default.class, Views.CategoryFull.class})
  private Long priority;

  @JsonView({Views.Default.class, Views.CategoryFull.class, Views.Ad.class, Views.Propositions.class})
  private Boolean isDetailed;

  @JsonView({Views.Default.class, Views.CategoryFull.class})
  private Boolean isOnlyForRent;

  @JsonView({Views.Default.class, Views.CategoryFull.class})
  private List<ConfigurationResponse> configurations;

}
