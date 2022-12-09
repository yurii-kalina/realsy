package ua.com.realtor.dto.response;

import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;
import lombok.EqualsAndHashCode;
import ua.com.realtor.dto.BaseDto;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
public class CityResponse extends BaseDto {
  @JsonView({Views.AdList.class, Views.PropertyList.class, Views.Ad.class, Views.City.class, Views.Property.class,
      Views.Propositions.class})
  private String name;

  @JsonView({Views.Location.class})
  private List<MetroResponse> metros;

  @JsonView({Views.Location.class})
  private List<DistrictResponse> districts;

}
