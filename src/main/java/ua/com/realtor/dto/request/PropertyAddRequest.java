package ua.com.realtor.dto.request;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.web.multipart.MultipartFile;
import ua.com.realtor.dto.BaseDto;

@Data
@EqualsAndHashCode(callSuper = true)
public class PropertyAddRequest extends BaseDto {
  private PropertyRequest property;
  private MultipartFile file;

}
