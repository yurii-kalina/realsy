package ua.com.realtor.dto.response;

import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;
import lombok.EqualsAndHashCode;
import ua.com.realtor.dto.BaseDto;

@EqualsAndHashCode(callSuper = true)
@Data
public class DistrictResponse extends BaseDto {
  @JsonView({Views.PropositionList.class, Views.Default.class, Views.AdList.class, Views.PropertyList.class, Views.Ad.class,
      Views.Location.class,
      Views.Property.class, Views.Propositions.class})
  private String name;
}
