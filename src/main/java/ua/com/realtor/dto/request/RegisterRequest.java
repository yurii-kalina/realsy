package ua.com.realtor.dto.request;

import lombok.Data;

@Data
public class RegisterRequest {
  private String fullName;
  private String phone;
  private String password;
  private String confirmPassword;
}
