package ua.com.realtor.dto.response;

import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;
import lombok.EqualsAndHashCode;
import ua.com.realtor.dto.BaseDto;

@EqualsAndHashCode(callSuper = true)
@Data
public class ConfigurationValueResponse extends BaseDto {
  @JsonView({Views.Default.class, Views.CategoryFull.class, Views.Propositions.class, Views.AdList.class,
      Views.PropertyList.class, Views.Ad.class})
  private String valueText;

  @JsonView({Views.Default.class, Views.CategoryFull.class, Views.Propositions.class, Views.Ad.class})
  private String icon;

  @JsonView({Views.Default.class, Views.CategoryFull.class})
  private Boolean isIconLarge;

  @JsonView({Views.Default.class, Views.CategoryFull.class})
  private Double iconWidth;

  @JsonView({Views.ValueFull.class})
  private ConfigurationResponse configuration;
}
