package ua.com.realtor.dto.request;

import lombok.Data;
import lombok.EqualsAndHashCode;
import ua.com.realtor.dto.BaseDto;
import ua.com.realtor.entity.Location;
import ua.com.realtor.entity.PropertyCategory;
import ua.com.realtor.entity.SubmittedValue;
import ua.com.realtor.entity.User;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
public class PropertyRequest extends BaseDto {
  private String name;
  private PropertyCategory propertyCategory;
  private Boolean isAvailableForSale;
  private Boolean isAvailableForRent;
  private Boolean isAvailableForImmediateArrival;
  private Date dateOfArrival;
  private Location location;
  private User user;
  private String description;
  private Double price;
  private List<SubmittedValue> values = new ArrayList<>();
}
