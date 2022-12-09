package ua.com.realtor.dto.response;

import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;
import lombok.EqualsAndHashCode;
import ua.com.realtor.dto.BaseDto;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
public class ConfigurationResponse extends BaseDto {
  @JsonView({Views.Default.class, Views.CategoryFull.class, Views.AdList.class, Views.Ad.class, Views.Property.class,
      Views.Propositions.class})
  private String name;

  @JsonView({Views.Propositions.class, Views.Default.class, Views.CategoryFull.class, Views.AdList.class,
      Views.PropertyList.class, Views.Ad.class,
      Views.Property.class})
  private String icon;

  @JsonView({Views.Default.class, Views.CategoryFull.class})
  private Boolean isIconLarge;

  @JsonView({Views.Propositions.class, Views.Default.class, Views.CategoryFull.class, Views.AdList.class,
      Views.PropertyList.class, Views.Ad.class,
      Views.Property.class})
  private Long priority;

  @JsonView({Views.Default.class, Views.CategoryFull.class, Views.AdList.class, Views.PropertyList.class, Views.Ad.class,
      Views.Property.class,
      Views.Propositions.class})
  private ConfigurationTypeResponse type;

  @JsonView({Views.Propositions.class, Views.Default.class, Views.CategoryFull.class, Views.AdList.class,
      Views.PropertyList.class, Views.Ad.class,
      Views.Property.class})
  private String unit;

  @JsonView({Views.Propositions.class, Views.Default.class, Views.CategoryFull.class, Views.AdList.class,
      Views.PropertyList.class, Views.Ad.class,
      Views.Property.class})
  private Boolean isSpecial;

  @JsonView({Views.CategoryFull.class, Views.Property.class})
  private Boolean isHeader;

  @JsonView({Views.Propositions.class, Views.ValueFull.class, Views.AdList.class, Views.PropertyList.class, Views.Ad.class,
      Views.Property.class})
  private ConfigurationCategoryResponse category;

  @JsonView({Views.CategoryFull.class, Views.Header.class})
  private List<ConfigurationValueResponse> values;
}
