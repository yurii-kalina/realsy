package ua.com.realtor.dto.request;

import lombok.Data;
import lombok.EqualsAndHashCode;
import ua.com.realtor.dto.BaseDto;
import ua.com.realtor.entity.User;

@Data
@EqualsAndHashCode(callSuper = true)
public class ChatRoomRequest extends BaseDto {
  private User sender;
  private User recipient;
}
