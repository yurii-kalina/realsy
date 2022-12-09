package ua.com.realtor.dto.response;

import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;
import lombok.EqualsAndHashCode;
import ua.com.realtor.dto.BaseDto;

import java.util.List;
import java.util.Map;

@Data
@EqualsAndHashCode(callSuper = true)
public class CityMetroLineResponse extends BaseDto {
  @JsonView({Views.Location.class})
  private Map<String, List<MetroResponse>> metros;
  @JsonView({Views.Location.class})
  private List<DistrictResponse> districts;

}
