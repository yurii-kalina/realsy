package ua.com.realtor.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import ua.com.realtor.dto.BaseDto;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserRequest extends BaseDto {
  private String fullName;
  private String phone;
  private Boolean isWorking;
  private Boolean isSmoker;
  private Boolean isPhoneVisible;
  private String occupation;
}
