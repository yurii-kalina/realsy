package ua.com.realtor.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import ua.com.realtor.dto.BaseDto;
import ua.com.realtor.entity.Location;
import ua.com.realtor.entity.PropertyCategory;
import ua.com.realtor.entity.SubmittedValue;
import ua.com.realtor.entity.User;
import ua.com.realtor.entity.enums.DealType;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AdRequest extends BaseDto {
  private PropertyCategory propertyCategory;
  private DealType type;
  private Location location;
  private User user;
  private String description;
  private double price;
  private double distanceFromMetro;
  private List<SubmittedValue> values;
}
