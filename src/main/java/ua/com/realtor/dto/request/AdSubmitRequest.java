package ua.com.realtor.dto.request;

import lombok.Data;
import lombok.EqualsAndHashCode;
import ua.com.realtor.dto.BaseDto;
import ua.com.realtor.entity.SubmittedValue;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
public class AdSubmitRequest extends BaseDto {
  List<SubmittedValue> values;
  private String name;
}
