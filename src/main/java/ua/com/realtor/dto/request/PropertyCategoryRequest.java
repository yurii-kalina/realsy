package ua.com.realtor.dto.request;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import ua.com.realtor.dto.BaseDto;
import ua.com.realtor.entity.PropertyType;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PropertyCategoryRequest extends BaseDto {
  private String name;
  private String icon;
  @JsonIgnore
  private PropertyType propertyTypeId;
}
