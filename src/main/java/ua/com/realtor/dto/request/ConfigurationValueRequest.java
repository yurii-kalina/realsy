package ua.com.realtor.dto.request;

import lombok.Data;
import lombok.EqualsAndHashCode;
import ua.com.realtor.dto.BaseDto;
import ua.com.realtor.entity.Configuration;


@Data
@EqualsAndHashCode(callSuper = true)
public class ConfigurationValueRequest extends BaseDto {
  Configuration configuration;

  private String valueText;
  private Double valueNumber;
  private String icon;


  private Boolean isIconLarge;

  private Double iconWidth;
}
