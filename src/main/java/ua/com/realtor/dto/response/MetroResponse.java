package ua.com.realtor.dto.response;

import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;
import lombok.EqualsAndHashCode;
import ua.com.realtor.dto.BaseDto;

@EqualsAndHashCode(callSuper = true)
@Data
public class MetroResponse extends BaseDto {
  @JsonView({Views.PropositionList.class, Views.PropertyList.class, Views.Default.class, Views.AdList.class, Views.Ad.class,
      Views.Property.class})
  private String name;

  @JsonView({Views.PropositionList.class, Views.PropertyList.class, Views.Default.class, Views.AdList.class, Views.Ad.class,
      Views.Property.class})
  private String metroLine;
}
