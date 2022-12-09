package ua.com.realtor.dto.response;

import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;
import lombok.EqualsAndHashCode;
import ua.com.realtor.dto.BaseDto;

import java.util.List;


@EqualsAndHashCode(callSuper = true)
@Data
public class PropertyCategoryResponse extends BaseDto {
  @JsonView({Views.PropositionList.class, Views.PropertyList.class, Views.Propositions.class, Views.Default.class,
      Views.CategoryFull.class, Views.AdList.class, Views.Ad.class,
      Views.Property.class})
  private String name;

  @JsonView({Views.Default.class, Views.CategoryFull.class, Views.Propositions.class})
  private String icon;

  @JsonView({Views.CategoryFull.class, Views.Header.class})
  private List<ConfigurationResponse> configurations;
}
