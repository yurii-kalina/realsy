package ua.com.realtor.dto.request;

import lombok.Data;
import lombok.EqualsAndHashCode;
import ua.com.realtor.dto.BaseDto;

@Data
@EqualsAndHashCode(callSuper = true)
public class PropertyImageRequest extends BaseDto {
  private String url;
}
