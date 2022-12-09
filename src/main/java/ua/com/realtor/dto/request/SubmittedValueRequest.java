package ua.com.realtor.dto.request;

import lombok.Data;
import lombok.EqualsAndHashCode;
import ua.com.realtor.dto.BaseDto;
import ua.com.realtor.entity.Configuration;
import ua.com.realtor.entity.ConfigurationValue;

import java.util.Date;

@EqualsAndHashCode(callSuper = true)
@Data
public class SubmittedValueRequest extends BaseDto {
  private Configuration configuration;

  private ConfigurationValue configurationValue;

  private Boolean valueBoolean;

  private Double valueNumber;

  private String valueText;

  private Double distanceInMeters;

  private Double numberFrom;

  private Double numberTo;

  private Date dateFrom;

  private Date dateTo;

  private Boolean isOptional;

  private String icon;

}
