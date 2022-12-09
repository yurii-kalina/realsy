package ua.com.realtor.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import ua.com.realtor.dto.BaseDto;
import ua.com.realtor.entity.City;
import ua.com.realtor.entity.District;
import ua.com.realtor.entity.Metro;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class LocationRequest extends BaseDto {
  private City city;
  private Double distanceFromMetro;
  private List<District> districts;
  private List<Metro> metros;
}
