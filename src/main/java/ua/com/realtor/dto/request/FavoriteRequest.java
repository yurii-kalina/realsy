package ua.com.realtor.dto.request;

import lombok.Data;
import lombok.EqualsAndHashCode;
import ua.com.realtor.dto.BaseDto;

@EqualsAndHashCode(callSuper = true)
@Data
public class FavoriteRequest extends BaseDto {
  private Long adId;
  private Long propertyId;
}
