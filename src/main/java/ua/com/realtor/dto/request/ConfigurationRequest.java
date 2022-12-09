package ua.com.realtor.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import ua.com.realtor.dto.BaseDto;
import ua.com.realtor.entity.SubmittedValue;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ConfigurationRequest extends BaseDto {
  private String name;
  private List<SubmittedValue> values;
}
